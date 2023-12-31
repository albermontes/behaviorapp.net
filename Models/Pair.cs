﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class Pair
    {
        public int Id { get; set; }
        public string value { get; set; }
        public string label { get; set; }

        public int? InterventionDescriptionId { get; set; }
        public int? InterventionBehaviorId { get; set; }
        public int? ResponseReinforceBeforeId { get; set; }
        public int? ResponseReplacementId { get; set; }
        public int? ResponseReinforceAfterId { get; set; }

    }
}
