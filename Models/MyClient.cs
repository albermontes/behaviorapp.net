using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class MyClient
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public bool Verbal { get; set; }
        public string Comments { get; set; }
        public virtual List<MyNote> Notes { get; set; }
    }
}
