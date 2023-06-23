using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class ActivityNearByDTO
    {
        private readonly HelperFunctions dataHelper = new HelperFunctions();

        public int placeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double rating { get; set; }
        public string imageURL { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string category { get; set; }
        public string tags { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public long? fbid { get; set; }
        public string fUrl { get; set; }
        public string instaUsername { get; set; }
        public string webAddress { get; set; }



        public void SetActivityNearByDTO(Activity_nearBY activityNearBy)
        {
            Activity activity = activityNearBy.Activity;

            placeID = activity.placeID;
            name = activity.name;
            description = activity.description;
            rating = activity.rating;
            imageURL = activity.imageURL;
            phone = activityNearBy.phone;
            address = activityNearBy.address;
            category = activityNearBy.category;
            latitude = dataHelper.GetLatitude(activityNearBy.landmark);
            longitude = dataHelper.GetLongitude(activityNearBy.landmark);
            fbid = activityNearBy.fbid;
            fUrl = activityNearBy.fUrl;
            instaUsername = activityNearBy.instaUsername;
            webAddress = activityNearBy.webAddress;
        }
    }
}
