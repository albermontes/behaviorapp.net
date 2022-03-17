using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using behavior_app.Models;
using Newtonsoft.Json;

namespace behavior_app.Controllers
{
    [ApiController]
    [Route("api/notesummary")]
    public class NoteSummaryController : ControllerBase
    {
        [HttpGet]
        public SummaryWrapper Get(string note)
        {
            return new SummaryWrapper { Summary = JsonConvert.DeserializeObject<MyNote>(note).getSummary() };
        }
    }

    public class SummaryWrapper
    {
        public string Summary { get; set; }
    }
}
