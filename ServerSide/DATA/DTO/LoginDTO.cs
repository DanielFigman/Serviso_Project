using DATA.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GeoCoordinatePortable;


namespace DATA
{
    public class LoginDTO
    {
        private readonly hotelAppDBContext db = new hotelAppDBContext();

        public string userType { get; set; }
        public string fName { get; set; }
        public string sName { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string languageShortName { get; set; }
        public int orderID { get; set; }
        public DateTime checkInDate { get; set; }
        public DateTime checkOutDate { get; set; }
        public int? hotelID { get; set; }
        public List<ActivityNearByDTO> activities_nearBy { get; set; }
        public List<ActivityHotelDTO> activities_hotel { get; set; }
        public List<FacilityDTO> facilities { get; set; }
        public List<Custom_Request_Type_DTO> Custom_Request_Types { get; set; }


        public void SetLoginDTO(User user ,Order order, Hotel hotel)
        {
            userType = "GUEST";
            fName = user.fName;
            sName = user.sName;
            phone = user.phone;
            gender = user.gender;
            dateOfBirth = user.dateOfBirth;
            languageShortName = user.Language.shortName;
            orderID = order.orderID;
            checkInDate = order.checkInDate;
            checkOutDate = order.checkOutDate;
            hotelID = hotel.hotelID;
            activities_nearBy = GetActivitiesNearBy(hotel.landmark);
            activities_hotel = GetActivitiesHotel(hotel.hotelID);
            facilities = GetFacilities(hotel);
            Custom_Request_Types = GetCustomTypes();
        }

        private List<ActivityNearByDTO> GetActivitiesNearBy(string landmark)
        {
            landmark = landmark.Trim('(', ')');
            string[] extractedLandMark = landmark.Split(',');

            double latitude = double.Parse(extractedLandMark[0].Trim());
            double longitude = double.Parse(extractedLandMark[1].Trim());

            var center = new GeoCoordinate(latitude, longitude);


            List<Activity_nearBY> activities = db.Activity_nearBY.ToList();

            List<Activity_nearBY> activitiesNearBy = new List<Activity_nearBY>();

            if (activities.Count() > 0)
            {

                // define the radius (in meters)
                var radius = 5000;


                foreach (Activity_nearBY activity in activities)
                {
                    string otherLandmark = activity.landmark;
                    otherLandmark = otherLandmark.Trim('(', ')');
                    string[] extractedOtherLandMark = otherLandmark.Split(',');
                    double otherLatitude = double.Parse(extractedOtherLandMark[0].Trim());
                    double otherLongitude = double.Parse(extractedOtherLandMark[1].Trim());

                    var otherCoordinate = new GeoCoordinate(otherLatitude, otherLongitude); // latitude, longitude

                    var distance = center.GetDistanceTo(otherCoordinate); // in meters

                    if(distance <= radius)
                    {
                        activitiesNearBy.Add(activity);
                    }


                }
            }

            List<ActivityNearByDTO> retVal = new List<ActivityNearByDTO>();

            if(activitiesNearBy.Count > 0)
            {
                activitiesNearBy.ForEach(x =>
                {
                    ActivityNearByDTO a = new ActivityNearByDTO();
                    a.SetActivityNearByDTO(x);
                    retVal.Add(a);
                });
            }

            return retVal;
        }

        private List<ActivityHotelDTO> GetActivitiesHotel(int hotelID)
        {
            List<Activity_hotel> activities = db.Activity_hotel.Where(x => x.hotelID == hotelID).ToList();

            List<ActivityHotelDTO> retVal = new List<ActivityHotelDTO>();

            if ( activities.Count > 0)
            {
                activities.ForEach(x =>
                {
                    ActivityHotelDTO a = new ActivityHotelDTO();
                    a.SetActivityHotelDTO(x);
                    retVal.Add(a);
                });
            }

            return retVal;
        }

        private List<FacilityDTO> GetFacilities(Hotel hotel)
        {
            List<Facility> facilties = hotel.Facilities.ToList();

            List<FacilityDTO> retVal = new List<FacilityDTO>();

            if(facilties.Count() > 0)
            {
                facilties.ForEach(x =>
                {
                    FacilityDTO f = new FacilityDTO();
                    f.setFacilityDTO(x);
                    retVal.Add(f);
                });
            }
            return retVal;
        }

        private List<Custom_Request_Type_DTO> GetCustomTypes()
        {
            List<Custom_Request_Types> customTypes = db.Custom_Request_Types.ToList();

            List<Custom_Request_Type_DTO> retVal = new List<Custom_Request_Type_DTO>();

            if(customTypes.Count() > 0)
            {
                customTypes.ForEach(x =>
                {
                    Custom_Request_Type_DTO cd = new Custom_Request_Type_DTO();
                    cd.setCustom_Request_Type_DTO(x);
                    retVal.Add(cd);
                });
            }

            return retVal;
        }
    }
}
