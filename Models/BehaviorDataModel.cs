using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class BxSession
    {
        public void test()
        {
            // behavior without reason
            var n1 = new BxItem
            {
                context = "RBT arrived",
                response = new BxNegativeResponse
                {
                    behaviors = new[] { "tantrum" }
                }
            };
            // behavior because mother was talking to RBT
            var n2 = new BxItem
            {
                triggers = new[] { "mother talking" },
                response = new BxNegativeResponse
                {
                    behaviors = new[] { "tantrum" }
                }
            };

        }
    }
    public class BxItem
    {
        public string context { get; set; }
        public IList<string> triggers { get; set; }
        public BxResponse response { get; set; }
    }
    public abstract class BxResponse
    {

    }
    public class BxPositiveResponse : BxResponse
    {
        public IList<string> positiveResponses { get; set; }
        public IList<string> reinforcements { get; set; }
        public IList<string> replacements { get; set; }
    }
    public class BxNegativeResponse : BxResponse
    {
        public IList<string> behaviors { get; set; }
        public IList<BxItem> interventions { get; set; }
    }
}
