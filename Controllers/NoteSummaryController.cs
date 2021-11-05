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
                string positiveResponse, string behaviors)
        {
            var beVerb = caregivers != null && (caregivers.Contains(",") || caregivers.Contains("and")) ? "were" : "was";
            var aJoin = behaviors != null && behaviors.StartsWithVocal() ? "an" : "a";
            return new Note 
            {
                Summary = (location != null 
                                ? $"The session took place in the {location.RemoveStartCapitalLetter()}. " : "") +
                    (caregivers != null 
                                ? $"{caregivers.AddStartCapitalLetter()} {beVerb} present in the session. " : "") +
                    (activities != null && (
                        positiveResponse != null ||
                         behaviors != null) 
                                ? $"After {activities.RemoveStartCapitalLetter()} the child " : "") +
                    (positiveResponse != null 
                                ? $"{positiveResponse.RemoveStartCapitalLetter()}. " : "") +
                    (behaviors != null 
                                ? $"starts {aJoin} {behaviors.RemoveStartCapitalLetter()}. " : "") +
                    $"This note summary was elaborated at {DateTime.Now.ToShortTimeString()} of {DateTime.Now.ToShortDateString()}."
            };
        }

        
    }
}
