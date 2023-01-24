using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class BxDataModel
    {
        #region to remove
        /*
        private const string NEGATIVE = "NEGATIVE";
        private const string POSITIVE = "POSITIVE";
        public List<BxClient> ConvertToBxModel(List<MyClient> clients)
        {
            var bxClients = new List<BxClient>();
            // foreach client
            foreach (var client in clients)
            {
                // create client
                var bxClient = new BxClient
                {
                    Number = client.Number,
                    Name = client.Name,
                    BirthDate = client.BirthDate,
                    Verbal = client.Verbal,
                    Comments = client.Comments,
                    Notes = new List<BxNote>()
                };
                // foreach note
                foreach (var note in client.Notes)
                {
                    // create note
                    var bxNote = new BxNote
                    {
                        Date = note.Date,
                        Location = note.detailInfo.location,
                        Caregivers = note.detailInfo.caregivers,
                        Antecedent = note.detailInfo.antecedent,
                        HealthSummary = note.detailInfo.healthSummary,
                        FamilyFeedback = note.detailInfo.familyFeedback,
                        CaregiverCompetency = note.detailInfo.caregiverCompetency,
                        Activities = new List<BxActivity>()
                    };
                    // foreach activity
                    foreach (var activity in note.activities)
                    {
                        // add activities to note
                        bxNote.Activities.Add(new BxActivity
                        {
                            ActivityName = activity.description,
                            ActivityResponse = convertToBxModel(activity.response, activity)
                        });
                    }
                    // add note to client
                    bxClient.Notes.Add(bxNote);
                }
                // add client to model
                bxClients.Add(bxClient);
            }
            return bxClients;
        }
        private static BxResponse convertToBxModel(MyResponse response, MyActivity activity)
        {
            if (response.label == POSITIVE)
            {
                return new BxPositiveResponse
                {
                    ResponseDescription = response.description,
                    ReinforcesBefore = convertToString(response.reinforceBefore),
                    ReinforcesAfter = convertToString(response.reinforceAfter),
                    Replacements = convertToString(response.replacement),
                    WasReinforceResponsePositive = response.reinforceResponse.label == POSITIVE,
                    ReinforceResponseDescription = response.reinforceResponse.description
                };
            }
            else if (response.label == NEGATIVE)
            {
                var bxNegativeResponse = new BxNegativeResponse();
                var interventionsCount = activity.interventions.Count;

                var i = 0;
                while (interventionsCount > 0)
                {
                    // include behaviors
                    bxNegativeResponse.Behaviors = new List<BxBehavior>();
                    foreach (var behavior in activity.interventions[i].behavior)
                    {
                        bxNegativeResponse.Behaviors.Add(new BxBehavior
                        {
                            Name = behavior.value,
                            Types = new List<string>(), //todo: include types in mymodel
                            Description = ""            //todo: include descriptions in mymodel
                        });
                    }
                    // include interventions
                    bxNegativeResponse.Interventions = convertToString(activity.interventions[i].description);
                    // include interventions response
                    bxNegativeResponse.InterventionResponse = convertToBxModel(activity.interventions[i].response, activity);
                    i++;
                    interventionsCount--;
                }

                return bxNegativeResponse;
            }
            return null;
        }
        private static List<string> convertToString(List<Pair> list)
        {
            var result = new List<string>();
            foreach (var item in list)
            {
                result.Add(item.value);
            }
            return result;
        }*/
        #endregion
    }
    public class BxClient
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public bool Verbal { get; set; }
        public string Comments { get; set; }
        public virtual List<BxNote> Notes { get; set; }
    }
    public class BxNote
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public List<string> Caregivers { get; set; }
        public string Antecedent { get; set; }
        public string HealthSummary { get; set; }
        public string FamilyFeedback { get; set; }
        public string CaregiverCompetency { get; set; }
        public virtual List<BxActivity> Activities { get; set; }
    }
    public class BxActivity
    {
        public int Id { get; set; }
        public string ActivityName { get; set; }
        public BxResponse ActivityResponse { get; set; }
    }
    public abstract class BxResponse
    {
        public int Id { get; set; }
    }
    public class BxPositiveResponse : BxResponse
    {
        public string ResponseDescription { get; set; }
        public List<string> ReinforcesBefore { get; set; }
        public List<string> Replacements { get; set; }
        public List<string> ReinforcesAfter { get; set; }
        public bool WasReinforceResponsePositive { get; set; }
        public string ReinforceResponseDescription { get; set; }
    }
    public class BxNegativeResponse : BxResponse
    {
        public List<BxBehavior> Behaviors { get; set; }
        public List<string> Interventions { get; set; }
        public BxResponse InterventionResponse { get; set; }
    }
    public class BxBehavior
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Types { get; set; }
        public string Description { get; set; }
    }
}
