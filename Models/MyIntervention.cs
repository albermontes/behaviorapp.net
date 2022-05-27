using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class MyIntervention
    {
        public int Id { get; set; }
        public string behaviorDescription { get; set; }
        public virtual MyResponse response { get; set; }
        public virtual List<Pair> description { get; set; }
        public virtual List<MyBehavior> behavior { get; set; }
        
    }
}
