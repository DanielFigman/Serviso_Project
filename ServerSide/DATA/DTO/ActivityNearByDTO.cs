using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class ActivityNearByDTO
    {
        public int placeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double rating { get; set; }
        public string imageURL { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string category { get; set; }
        public string tags { get; set; }
        public string landmark { get; set; }



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
            tags = activityNearBy.tags;
            landmark = activityNearBy.landmark;
        }
    }


}
