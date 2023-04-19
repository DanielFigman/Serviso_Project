using DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication
{
    public class SuggestedActivitiesDTO
    {
        private readonly HelperFunctions dataHelper = new HelperFunctions();

        public int placeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double rating { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string category { get; set; }
        public string tags { get; set; }
        public string landmark { get; set; }

        public SuggestedActivitiesDTO(object suggested)
        {
        }
    }
}