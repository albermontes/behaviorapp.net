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
            var myNote = JsonConvert.DeserializeObject<MyNote>(note);
            if(myNote.jsonNote != null)
                myNote = JsonConvert.DeserializeObject<MyNote>(myNote.jsonNote);

            return new SummaryWrapper 
            { 
                Summary = myNote.getSummary() 
            };
        }
    }

    public class SummaryWrapper
    {
        public string Summary { get; set; }
    }
}
