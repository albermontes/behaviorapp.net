using System.Collections.Generic;

namespace behavior_app.Models
{
    public class MyNote
    {
        public MyDetailInfo detailInfo { get; set; }
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
        public List<Pair> description { get; set; }
        public MyResponse response { get; set; }
        public List<Pair> behavior { get; set; }
        public string behaviorDescription { get; set; }
    }
    public class MyResponse
    {
        public string label { get; set; }
        public string description { get; set; }
        public List<Pair> reinforceBefore { get; set; }
        public List<Pair> replacement { get; set; }
        public List<Pair> reinforceAfter { get; set; }
        public MyReinforceResponse reinforceResponse { get; set; }
    }
    public class MyReinforceResponse
    {
        public string label { get; set; }
        public string description { get; set; }
    }
    public class Pair
    {
        public string value { get; set; }
        public string label { get; set; }
    }
}
