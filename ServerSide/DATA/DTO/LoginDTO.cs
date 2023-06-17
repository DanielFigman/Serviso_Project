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
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public string userType { get; set; }
        public string fName { get; set; }
        public string sName { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public string Ntoken { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string languageShortName { get; set; }
        public int orderID { get; set; }
        public DateTime checkInDate { get; set; }
        public DateTime checkOutDate { get; set; }
        public int? hotelID { get; set; }
        public List<ActivityNearByDTO> activities_nearBy { get; set; }
        public List<ActivityHotelDTO> activities_hotel { get; set; }
        public List<FacilityDTO> facilities { get; set; }
        public List<Custom_Request_Type_DTO> custom_Request_Types { get; set; }
        public List<TherapyDTO> therapies { get; set; }
        public HotelDTO hotel { get; set; }
        public List<FoodDTO> food { get; set; }
        public QuestionaireDTO questionnaire { get; set; }


        public void SetLoginDTO(User user ,Order order)
        {
            Hotel hotel = order.Hotel;

            userType = "GUEST";
            fName = user.fName;
            sName = user.sName;
            phone = user.phone;
            gender = user.gender;
            Ntoken = user.NotificationToken;
            dateOfBirth = user.dateOfBirth;
            languageShortName = user.Language.shortName;
            orderID = order.orderID;
            checkInDate = order.checkInDate;
            checkOutDate = order.checkOutDate;
            hotelID = hotel.hotelID;
            activities_nearBy = GetActivitiesNearBy(hotel.landmark);
            activities_hotel = GetActivitiesHotel(hotel.hotelID);
            facilities = GetFacilities(hotel);
            custom_Request_Types = GetCustomTypes();
            therapies = GetTherapies(hotel.hotelID);
            this.hotel = GetHotel(hotel);
            food = GetFood(hotel.hotelID);
            questionnaire = GetQuestionnaire(user.email);
        }

        private List<ActivityNearByDTO> GetActivitiesNearBy(string landmark)
        {
            landmark = landmark.Trim('(', ')');
            string[] extractedLandMark = landmark.Split(',');

            double hotelLatitude = double.Parse(extractedLandMark[0].Trim());
            double hotelLongitude = double.Parse(extractedLandMark[1].Trim());

            var hotelCoordinate = new GeoCoordinate(hotelLatitude, hotelLongitude);


            List<Activity_nearBY> activities = db.Activity_nearBY.ToList();

            List<Activity_nearBY> activitiesNearBy = new List<Activity_nearBY>();

            if (activities.Count() > 0)
            {

                // define the radius (in meters)
                var radius = 5000;


                foreach (Activity_nearBY activity in activities)
                {
                    string activityLandmark = activity.landmark;
                    activityLandmark = activityLandmark.Trim('(', ')');
                    string[] extractedActivityLandmark = activityLandmark.Split(',');
                    double activityLatitude = double.Parse(extractedActivityLandmark[0].Trim());
                    double activityLongitude = double.Parse(extractedActivityLandmark[1].Trim());

                    var activityCoordinate = new GeoCoordinate(activityLatitude, activityLongitude);

                    var distance = hotelCoordinate.GetDistanceTo(activityCoordinate); // in meters

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
                    Custom_Request_Type_DTO cr = new Custom_Request_Type_DTO();
                    cr.setCustom_Request_Type_DTO(x);
                    retVal.Add(cr);
                });
            }

            return retVal;
        }

        private List<TherapyDTO> GetTherapies(int hotelID)
        {
            List<Therapy> therapies = db.Therapies.Where(t => t.hotelID == hotelID).ToList();

            List<TherapyDTO> retVal = new List<TherapyDTO>();

            if(therapies.Count() > 0)
            {
                therapies.ForEach(x =>
                {
                    TherapyDTO td = new TherapyDTO();
                    td.SetTherapyDTO(x);
                    retVal.Add(td);
                });
            }

            return retVal;
        }

        private HotelDTO GetHotel(Hotel hotel)
        {
            HotelDTO hotelDTO = new HotelDTO();
            hotelDTO.SetHotelDTO(hotel);

            return hotelDTO;
        }

        private List<FoodDTO> GetFood(int hotelID)
        {
            List<Food_And_Drinks> food = db.Food_And_Drinks.Where(f => f.hotelID == hotelID).ToList();

            List<FoodDTO> retVal = new List<FoodDTO>();

            food.ForEach(f =>
            {
                FoodDTO foodDTO = new FoodDTO();
                foodDTO.SetFoodDTO(f);
                retVal.Add(foodDTO);
            });

            return retVal;
        }

        private QuestionaireDTO GetQuestionnaire(string email)
        {
            QuestionaireDTO retVal = new QuestionaireDTO();
            Questionnaire userQuestionnaire = db.Questionnaires.FirstOrDefault(questionnaire => questionnaire.User.email == email);

            if(userQuestionnaire != null)
            {
                retVal.SetQuestionaireDTO(userQuestionnaire);
            }
            else
            {
                retVal = null;
            }

            return retVal;
        }
    }
}
