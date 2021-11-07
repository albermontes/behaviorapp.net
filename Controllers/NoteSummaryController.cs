using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using behavior_app.Models;

namespace behavior_app.Controllers
{
    [ApiController]
    [Route("notesummary")]
    public class NoteSummaryController : ControllerBase
    {
        [HttpGet]
        public Note Get(string location, string caregivers, string activities,
                string positiveResponse, string reinforcementsBefore,
                string reinforcementsAfter, string replacements,
                string behaviors, string interventions)
        {
            return new Session
            {
                location = location,
                caregivers = caregivers,
                activities = activities,
                positiveResponse = positiveResponse,
                reinforcementsBefore = reinforcementsBefore,
                reinforcementsAfter = reinforcementsAfter,
                replacements = replacements,
                behaviors = behaviors,
                interventions = interventions
            }.CreateNote();
        }

        
    }
}
