using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class MyDetailInfo
    {
        public int Id { get; set; }
        
        public string location { get; set; }
        public List<string> caregivers { get; set; }
        public string antecedent { get; set; }
        public string healthSummary { get; set; }
        public string familyFeedback { get; set; }
        public string caregiverCompetency { get; set; }
    }
}
