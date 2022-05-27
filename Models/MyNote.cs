using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class MyNote
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual MyDetailInfo detailInfo { get; set; }
        public virtual List<MyActivity> activities { get; set; }

        public int ClientId { get; set; }

        public string getSummary()
        {
            var introductionSummary = "";
            var activitiesSummary = "";
            var conclusionSummary = "";

            if (this.detailInfo != null)
            {
                var caregivers = "";
                var caregiversList = this.detailInfo.caregivers.ToList();
                for (int i = 0; i < this.detailInfo.caregivers.Count - 2; i++)
                {
                    caregivers += this.detailInfo.caregivers.ToList()[i].RemoveStartCapitalLetter() + ", ";
                }
                if (this.detailInfo.caregivers.Count > 1)
                    caregivers += $"{caregiversList[caregiversList.Count - 2].RemoveStartCapitalLetter()}" +
                        $" and {caregiversList[caregiversList.Count - 1].RemoveStartCapitalLetter()}";
                else
                {
                    if (this.detailInfo.caregivers.Count > 0)
                        caregivers += caregiversList[caregiversList.Count - 1].RemoveStartCapitalLetter();
                }
            

                introductionSummary =
                    (!string.IsNullOrWhiteSpace(this.detailInfo.location)
                        ? "<mark class=\"gnx-bck-introduction\">" +
                            $"The session took place " +
                            $"{this.detailInfo.location.RemoveStartCapitalLetter()}. " +
                            "</mark>"
                        : ""
                    ) +
                    (this.detailInfo.caregivers.Count > 0
                        ? "<mark class=\"gnx-bck-introduction\">" +
                            $"The {caregivers} " +
                            (this.detailInfo.caregivers.Count > 1 ? "were" : "was") +
                            " present too. " +
                            "</mark>"
                        : "") +
                    (!string.IsNullOrWhiteSpace(this.detailInfo.antecedent)
                        ? "<mark class=\"gnx-bck-introduction\">" +
                            $"{this.detailInfo.antecedent.AddStartCapitalLetter()}. " +
                            "</mark>"
                        : "");

                conclusionSummary =

                    (!string.IsNullOrWhiteSpace(this.detailInfo.healthSummary)
                        ? "<mark class=\"gnx-bck-conclusion\">" +
                            $"{this.detailInfo.healthSummary.AddStartCapitalLetter()}. " +
                            "</mark>"
                        : "") +
                    (!string.IsNullOrWhiteSpace(this.detailInfo.familyFeedback)
                        ? "<mark class=\"gnx-bck-conclusion\">" +
                        $"{this.detailInfo.familyFeedback.AddStartCapitalLetter()}. "
                        + "</mark>"
                        : "") +
                    (!string.IsNullOrWhiteSpace(this.detailInfo.caregiverCompetency)
                        ? "<mark class=\"gnx-bck-conclusion\">" +
                            $"{this.detailInfo.caregiverCompetency.AddStartCapitalLetter()}. " +
                            "</mark>"
                        : "");
            }
            
            if (this.activities != null)
            {
                foreach (var act in this.activities)
                {
                    var activity =
                         (act.description == "other"
                                ? (!string.IsNullOrWhiteSpace(act.eventTrigger)
                                    ? "<mark class=\"gnx-bck-activities\">" +
                                        $"{act.eventTrigger.AddStartCapitalLetter()}." +
                                        "</mark>"
                                    : "")
                                : "<mark class=\"gnx-bck-activities\">" +
                                    $"{act.description.AddStartCapitalLetter()}. " +
                                    "</mark>");
                    if (!string.IsNullOrWhiteSpace(act.response.label))
                    {
                        switch (act.response.label)
                        {
                            case "POSITIVE":
                                activity +=
                                    (!string.IsNullOrWhiteSpace(act.response.description)
                                        ? "<mark class=\"gnx-bck-transitions\">" +
                                                (act.description == "other"
                                                    ? $"{act.response.description.AddStartCapitalLetter()}. "
                                                    : $"{act.response.description}. ") +
                                            "</mark>"
                                        : "") +
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
                                                        ? $"{intervention.behavior.Format(null, "The client shows ", "", false)}"
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
                                            if (intervention.response.label == "POSITIVE")
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
            }

            return introductionSummary + activitiesSummary + conclusionSummary;
        }

    }
}
