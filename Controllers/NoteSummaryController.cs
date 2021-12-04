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
        public Note Get(string note)
        {
            return new Session
            {
                note = note
            }.CreateNote();
        }
    }
}
