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
        public Note Get(string location, string caregivers, string activities)
        {
            return new Note 
            {
                Summary = (location != null ? $"The session took place in the {location}. " : "") +
                    (caregivers != null ? $"{caregivers.AddStartCapitalLetter()} was present in the session. " : "") +
                    (activities != null ? $"After {activities.RemoveStartCapitalLetter()} the child ... " : "") +
                    $"This note summary was elaborated at {DateTime.Now.ToShortTimeString()} of {DateTime.Now.ToShortDateString()}."
            };
        }

        
    }
}
