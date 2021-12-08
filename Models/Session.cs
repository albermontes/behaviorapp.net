using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Serialization;

namespace behavior_app.Models
{
    public class Session
    {
        public string note { get; set; }
        public string toXml()
        {
            MyNote myNote = JsonConvert.DeserializeObject<MyNote>(note);
            var serializer = new XmlSerializer(typeof(MyNote));
            var result = "";
            using (var sww = new StringWriter())
            {
                using (XmlWriter writer = XmlWriter.Create(sww))
                {
                    serializer.Serialize(writer, myNote);
                    result = sww.ToString();
                }
            }
            return result;
        }
        public Note CreateNote()
        {
            MyNote myNote = JsonConvert.DeserializeObject<MyNote>(note);

            var caregivers = "";
            for (int i = 0; i < myNote.detailInfo.caregivers.Count - 2; i++)
            {
                caregivers += myNote.detailInfo.caregivers[i].RemoveStartCapitalLetter() + ", ";
            }
            if(myNote.detailInfo.caregivers.Count > 1)
                caregivers += $"{myNote.detailInfo.caregivers[myNote.detailInfo.caregivers.Count - 2].RemoveStartCapitalLetter()}" +
                    $" and {myNote.detailInfo.caregivers[myNote.detailInfo.caregivers.Count - 1].RemoveStartCapitalLetter()}";
            else
            {
                if(myNote.detailInfo.caregivers.Count > 0)
                    caregivers += myNote.detailInfo.caregivers[myNote.detailInfo.caregivers.Count - 1].RemoveStartCapitalLetter();
            }

            var introductionSummary = 
                (!string.IsNullOrWhiteSpace(myNote.detailInfo.location)
                    ? "<mark class=\"gnx-bck-introduction\">" + 
                        $"The session took place " +
                        $"{myNote.detailInfo.location.RemoveStartCapitalLetter()}. " +
                        "</mark>"
                    : ""
                ) +
                (myNote.detailInfo.caregivers.Count > 0
                    ? "<mark class=\"gnx-bck-introduction\">" + 
                        $"The {caregivers} " + 
                        (myNote.detailInfo.caregivers.Count > 1 ? "were" : "was") + 
                        " present in the session. " +
                        "</mark>"
                    : "") +
                (!string.IsNullOrWhiteSpace(myNote.detailInfo.antecedent)
                    ? "<mark class=\"gnx-bck-introduction\">" +  
                        $"The client has an antecedent of " +
                        $"{myNote.detailInfo.antecedent.RemoveStartCapitalLetter()}. " +
                        "</mark>"
                    : "");

            var conclusionSummary =

                (!string.IsNullOrWhiteSpace(myNote.detailInfo.healthSummary)
                    ? "<mark class=\"gnx-bck-conclusion\">" +
                        $"{myNote.detailInfo.healthSummary.AddStartCapitalLetter()}. " +
                        "</mark>"
                    : "") +
                (!string.IsNullOrWhiteSpace(myNote.detailInfo.familyFeedback)
                    ? "<mark class=\"gnx-bck-conclusion\">" +
                    $"{myNote.detailInfo.familyFeedback.AddStartCapitalLetter()}. "
                    + "</mark>"
                    : "") +
                (!string.IsNullOrWhiteSpace(myNote.detailInfo.caregiverCompetency)
                    ? "<mark class=\"gnx-bck-conclusion\">" +
                        $"{myNote.detailInfo.caregiverCompetency.AddStartCapitalLetter()}. " +
                        "</mark>"
                    : "");

            var activitiesSummary = "";
            foreach (var act in myNote.activities)
            {
                var activity = "<mark class=\"gnx-bck-activities\">" +
                    $"After {act.description.RemoveStartCapitalLetter()} the client " + 
                    "</mark>";
                if (!string.IsNullOrWhiteSpace(act.response.label))
                {
                    switch (act.response.label)
                    {
                        case "POSITIVE":
                            activity +=
                                (!string.IsNullOrWhiteSpace(act.response.description)
                                ? "<mark class=\"gnx-bck-transitions\">" + 
                                    $"{act.response.description}. " + 
                                    "</mark>" +
                                    (!string.IsNullOrWhiteSpace(act.response.reinforceBefore)
                                        ? "<mark class=\"gnx-bck-reinforcements\">" + 
                                            $"We reinforce this positive response with " +
                                            $"{act.response.reinforceBefore.RemoveStartCapitalLetter()}. " +
                                            "</mark>"
                                        : "") +
                                
                                    (!string.IsNullOrWhiteSpace(act.response.replacement)
                                        ? "<mark class=\"gnx-bck-replacements\">" + 
                                            $"We apply a " +
                                            $"{act.response.replacement.RemoveStartCapitalLetter()}. " +
                                            "</mark>"
                                        : "") +
                                
                                    (!string.IsNullOrWhiteSpace(act.response.reinforceAfter)
                                        ? "<mark class=\"gnx-bck-reinforcements\">" +  $"We finally give the child " +
                                            $"{act.response.reinforceAfter.RemoveStartCapitalLetter()}. " +
                                            "</mark>"
                                        : "")
                                : "");
                            break;
                        case "NEGATIVE":
                            if (act.interventions.Any())
                            {
                                foreach (var intervention in act.interventions)
                                {
                                    var aJoin = !string.IsNullOrWhiteSpace(intervention.behavior) &&
                                                   intervention.behavior.StartsWithVocal()
                                               ? "an"
                                               : "a";
                                    activity += "<mark class=\"gnx-bck-behaviors\">" +
                                                $"starts {aJoin} {intervention.behavior.RemoveStartCapitalLetter()}. " +
                                                "</mark>" +
                                                    (!string.IsNullOrWhiteSpace(intervention.description)
                                                        ? "<mark class=\"gnx-bck-interventions\">" + 
                                                            $"We applied {intervention.description.RemoveStartCapitalLetter()} " +
                                                            $"to intervene the behavior and the client " +
                                                            "</mark>"
                                                        : "");

                                    if (!string.IsNullOrWhiteSpace(intervention.response.label))
                                    {
                                        if(intervention.response.label == "POSITIVE")
                                        {
                                            activity += (!string.IsNullOrWhiteSpace(intervention.response.description)
                                                            ? "<mark class=\"gnx-bck-transitions\">" + 
                                                                $"{intervention.response.description}. " +
                                                                "</mark>" +
                                                                (!string.IsNullOrWhiteSpace(intervention.response.reinforceBefore)
                                                                    ? "<mark class=\"gnx-bck-reinforcements\">" + 
                                                                        $"We reinforce this positive response with " +
                                                                        $"{intervention.response.reinforceBefore.RemoveStartCapitalLetter()}. " +
                                                                        "</mark>"
                                                                    : "") +
                                                                (!string.IsNullOrWhiteSpace(intervention.response.replacement)
                                                                    ? "<mark class=\"gnx-bck-replacements\">" + $"We apply a " +
                                                                        $"{intervention.response.replacement.RemoveStartCapitalLetter()}. " +
                                                                        "</mark>"
                                                                    : "") +
                                                                (!string.IsNullOrWhiteSpace(intervention.response.reinforceAfter)
                                                                    ? "<mark class=\"gnx-bck-reinforcements\">" + $"We finally give the child " +
                                                                        $"{intervention.response.reinforceAfter.RemoveStartCapitalLetter()}. " +
                                                                        "</mark>"
                                                                    : "")
                                                            : "");
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                activitiesSummary += activity;
            }

            return new Note
            {
                Summary = introductionSummary + activitiesSummary + conclusionSummary
            };
        }
    }
    public class MyNote
    {
        public MyDetailInfo detailInfo{ get; set; }
        public List<MyActivity> activities { get; set; }

    }
    public class MyDetailInfo
    {
        public string location { get; set; }
        public List<string> caregivers { get; set; }
        public string antecedent { get; set; }
        public string healthSummary { get; set; }
        public string familyFeedback { get; set; }
        public string caregiverCompetency { get; set; }
    }
    public class MyActivity
    {
        public string description { get; set; }
        public MyResponse response { get; set; }
        public List<MyIntervention> interventions { get; set; }
    }
    public class MyIntervention
    {
        public string description { get; set; }
        public MyResponse response { get; set; }
        public string behavior { get; set; }
    }
    public class MyResponse
    {
        public string label { get; set; }
        public string description { get; set; }
        public string reinforceBefore { get; set; }
        public string replacement { get; set; }
        public string reinforceAfter { get; set; }
    }
}
