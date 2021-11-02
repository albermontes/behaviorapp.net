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
        public Note Get(string location, string caregivers)
        {
            return new Note 
            {
                Summary = (location != null ? $"The session took place in the {location}. " : "") +
                    (caregivers != null ? $"{caregivers} was present in the session. " : "") +
                    $"This note summary was elaborated at {DateTime.Now.ToShortTimeString()} of {DateTime.Now.ToShortDateString()}."
            };
        }
    }
}
