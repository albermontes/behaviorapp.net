using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class MyResponse
    {
        public int Id { get; set; }

        public string label { get; set; }
        public string description { get; set; }
        public virtual MyReinforceResponse reinforceResponse { get; set; }
        public virtual List<Pair> reinforceBefore { get; set; }
        public virtual List<Pair> replacement { get; set; }
        public virtual List<Pair> reinforceAfter { get; set; }
    }
}
