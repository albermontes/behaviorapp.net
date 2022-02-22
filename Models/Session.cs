using Newtonsoft.Json;
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
                        " present too. " +
                        "</mark>"
                    : "") +
                (!string.IsNullOrWhiteSpace(myNote.detailInfo.antecedent)
                    ? "<mark class=\"gnx-bck-introduction\">" +  
                        $"{myNote.detailInfo.antecedent.AddStartCapitalLetter()}. " +
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
                var activity =
                     (act.description == "other"
                            ? (!string.IsNullOrWhiteSpace(act.eventTrigger)
                                ? "<mark class=\"gnx-bck-activities\">" +
                                    $"{act.eventTrigger.AddStartCapitalLetter()}." +
                                    "</mark>"
                                : "")
                            :   "<mark class=\"gnx-bck-activities\">" +
                                $"{act.description.AddStartCapitalLetter()}. " + 
                                "</mark>");
                if (!string.IsNullOrWhiteSpace(act.response.label))
                {
                    switch (act.response.label)
                    {
                        case "POSITIVE":
                            activity +=
                                (!string.IsNullOrWhiteSpace(act.response.description)
                                    ?   "<mark class=\"gnx-bck-transitions\">" +
                                            (act.description == "other"
                                                ? $"{act.response.description.AddStartCapitalLetter()}. "
                                                : $"{act.response.description}. ") +
                                        "</mark>"
                                    : "" ) +
                                (act.response.reinforceBefore != null
                                    ? act.response.reinforceBefore.Format("gnx-bck-reinforcements", "",
                                        (act.response.reinforceBefore.Count() > 1 
                                            ? " were used as reinforcer." 
                                            : " was used as reinforcer."))
                                    : "") +
                                (act.response.replacement != null 
                                    ? act.response.replacement.Format("gnx-bck-replacements", "",
                                        (act.response.replacement.Count() > 1 
                                            ? " were applied as replacement." 
                                            : " was applied as replacement."), true, true)
                                    : "") +
                                (act.response.reinforceAfter != null 
                                    ? act.response.reinforceAfter.Format("gnx-bck-reinforcements", "",
                                        (act.response.reinforceAfter.Count() > 1 
                                            ? " were used as reinforcer." 
                                            : " was used as reinforcer."))
                                    : "") +
                                (act.response.reinforceResponse != null
                                                        && !string.IsNullOrWhiteSpace(act.response.reinforceResponse.label)
                                                        && !string.IsNullOrWhiteSpace(act.response.reinforceResponse.description)
                                                            ? $"{act.response.reinforceResponse.description.AddStartCapitalLetter()}."
                                                            : "");
                            break;
                        case "NEGATIVE":
                            if (act.interventions.Any())
                            {
                                foreach (var intervention in act.interventions)
                                {
                                    activity += "<mark class=\"gnx-bck-behaviors\">" +
                                                (string.IsNullOrWhiteSpace(intervention.behaviorDescription) && intervention.behavior != null
                                                    ? $"{intervention.behavior.Format(null, "The client shows ", "", false)}."
                                                    : "") +
                                                (!string.IsNullOrWhiteSpace(intervention.behaviorDescription)
                                                    ? $"{intervention.behaviorDescription.AddStartCapitalLetter()}. "
                                                    : "") +
                                                "</mark>" +
                                                (intervention.description != null && intervention.description.Any()
                                                    ? intervention.description.Format("gnx-bck-interventions", "",
                                                        (intervention.description.Count() > 1 
                                                            ? " were applied as intervention." 
                                                            : " was applied as intervention."))
                                                    : "");

                                    if (!string.IsNullOrWhiteSpace(intervention.response.label))
                                    {
                                        if(intervention.response.label == "POSITIVE")
                                        {
                                            activity += (!string.IsNullOrWhiteSpace(intervention.response.description)
                                                            ? "<mark class=\"gnx-bck-transitions\">" +
                                                                $"{intervention.response.description}. " +
                                                                "</mark>"
                                                            : "") +
                                                        (intervention.response.reinforceBefore != null
                                                            ? intervention.response.reinforceBefore.Format(
                                                                    "gnx-bck-reinforcements", "",
                                                                    (intervention.response.reinforceBefore.Count() > 1 
                                                                        ? " were used as reinforcer." 
                                                                        : " was used as reinforcer."))
                                                            : "") +
                                                        (intervention.response.replacement != null
                                                            ? intervention.response.replacement.Format("gnx-bck-replacements", "",
                                                                (intervention.response.replacement.Count() > 1 
                                                                    ? " were applied as replacement." 
                                                                    : " was applied as replacement."), true, true)
                                                            : "") +
                                                        (intervention.response.reinforceAfter != null
                                                            ? intervention.response.reinforceAfter.Format("gnx-bck-reinforcements", "",
                                                                 (intervention.response.reinforceAfter.Count() > 1 
                                                                    ? " were used as reinforcer." 
                                                                    : " was used as reinforcer."))
                                                            : "") + 
                                                        (intervention.response.reinforceResponse != null 
                                                            && !string.IsNullOrWhiteSpace(intervention.response.reinforceResponse.label) 
                                                            && !string.IsNullOrWhiteSpace(intervention.response.reinforceResponse.description)
                                                                ? $"{intervention.response.reinforceResponse.description.AddStartCapitalLetter()}."
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

            var resultNote = new Note
            {
                Summary = introductionSummary + activitiesSummary + conclusionSummary
            };

            return resultNote;
        }
    }

}
