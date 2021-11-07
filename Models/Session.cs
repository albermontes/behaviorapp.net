using System;

namespace behavior_app.Models
{
    public class Session
    {
        public string location { get; set; }
        public string caregivers { get; set; }
        public string activities { get; set; }
        public string positiveResponse { get; set; }
        public string reinforcementsBefore { get; set; }
        public string reinforcementsAfter { get; set; }
        public string replacements { get; set; }
        public string interventions { get; set; }
        public string behaviors { get; set; }

        public Note CreateNote()
        {
            var beVerb = caregivers != null &&
                            (caregivers.Contains(",") ||
                                caregivers.Contains("and"))
                        ? "were"
                        : "was";
            var aJoin = behaviors != null &&
                            behaviors.StartsWithVocal()
                        ? "an"
                        : "a";

            var positiveSummary = positiveResponse != null
                                    ? $"{positiveResponse.RemoveStartCapitalLetter()}. "
                                    : "";
            var reinfBeforeSummary = positiveResponse != null &&
                                        reinforcementsBefore != null
                                ? $"We reinforce this positive response with " +
                                    $"{reinforcementsBefore.RemoveStartCapitalLetter()}. "
                                : "";
            var reinfAfterSummary = positiveResponse != null && 
                                        reinforcementsAfter != null
                                ? $"We also give {reinforcementsAfter.RemoveStartCapitalLetter()} to the child. "
                                : "";
            var replaceSummary = positiveResponse != null && 
                                    replacements != null
                                ? $"{replacements} ."
                                : "";

            var behaviorSummary = behaviors != null &&
                                        interventions != null
                                    ? $"starts {aJoin} {behaviors.RemoveStartCapitalLetter()}. We applied " +
                                    $"{interventions.RemoveStartCapitalLetter()} to intervene the behavior."
                                    : "";

            var activitySummary = activities != null &&
                                    (positiveResponse != null ||
                                        behaviors != null)
                                    ? $"After {activities.RemoveStartCapitalLetter()} the child "
                                    : "";

            return new Note
            {
                Summary = (location != null
                               ? $"The session took place in the {location.RemoveStartCapitalLetter()}. "
                               : ""
                            ) +
                            (caregivers != null
                               ? $"{caregivers.AddStartCapitalLetter()} {beVerb} present in the session. "
                               : ""
                            ) +
                            (activities != null
                                ? activitySummary +
                                (positiveResponse != null
                                    ? positiveSummary + reinfBeforeSummary + replaceSummary + reinfAfterSummary
                                    : behaviorSummary
                                )
                                : ""
                            )
            };
        }
    }
}
