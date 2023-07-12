using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DATA.DTO
{
    public class ActivityHotelDTO
    {
        public int placeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imageURL { get; set; }
        public int? HallNum { get; set; }
        public string tags { get; set; }
        public int hotelID { get; set; }


        public void SetActivityHotelDTO(Activity_hotel activityHotel)
        {
            Activity activity = activityHotel.Activity;

            placeID = activity.placeID;
            name = activity.name;
            description = activity.description;
            imageURL = activity.imageURL;
            HallNum = activityHotel.HallNum;
            tags = activityHotel.tags;
            hotelID = activityHotel.hotelID;
        }
   
        public Dictionary<string, string> GetActivityHotelToTranslate()
        {
            Dictionary<string, string> retVal = new Dictionary<string, string>();
            retVal["name"] = name;
            retVal["description"] = description;
            retVal["tags"] = tags;

            return retVal;
        }
    }
}
