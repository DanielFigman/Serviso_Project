using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class HotelDTO
    {
        private readonly HelperFunctions dataHelper = new HelperFunctions();

        public int hotelID { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string imageURL { get; set; }

        public void SetHotelDTO(Hotel hotel)
        {
            hotelID = hotel.hotelID;
            name = hotel.name;
            address = hotel.address;
            phone = hotel.phone;
            imageURL = hotel.imageURL;
            latitude = dataHelper.GetLatitude(hotel.landmark);
            longitude = dataHelper.GetLongitude(hotel.landmark);
        }


        public Dictionary<string, string> GetHotelToTranslate()
        {
            Dictionary<string, string> retVal = new Dictionary<string, string>();
            retVal["name"] = name;
            retVal["address"] = address;

            return retVal;
        }
    }
}
