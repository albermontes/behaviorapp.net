using System;

namespace behavior_app.Models
{
    public class Note
    {
        private string _summary;
        public string Summary 
        {
            get 
            {
                return _summary;
            }
            set
            {
                _summary = value.RemoveDuplicateSpacesAndDots();
            } 
        }
    }
}
