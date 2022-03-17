using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class MyActivity
    {
        public int Id { get; set; }
        public string description { get; set; }
        public string eventTrigger { get; set; }
        public virtual MyResponse response { get; set; }
        public virtual List<MyIntervention> interventions { get; set; }
    }
}
