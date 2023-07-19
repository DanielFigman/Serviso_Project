using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA.DTO
{
    public class HotelServicesDTO
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        private readonly Hotel _hotel;

        public List<ActivityHotelDTO> hotel_activities { get; set; }
        public List<FacilityDTO> hotel_facilities { get; set; }
        public List<TherapyDTO> spa_therapies { get; set; }
        public List<FoodDTO> food_menu { get; set; }
        public List<DrinksDTO> drinks_menu { get; set; }
        public List<AlcoholDTO> alcohol_menu { get; set; }
        public List<AdditionalItemsDTO> additionalItems_menu { get; set; }

        public HotelServicesDTO(Hotel hotel)
        {
            _hotel = hotel;

            hotel_activities = GetHotelActivities();

            hotel_facilities = GetHotelFacilities();

            spa_therapies = GetSpaTherapies();

            food_menu = GetFoodMenu();

            drinks_menu = GetDrinksMenu();

            alcohol_menu = GetAlcoholMenu();

            additionalItems_menu = GetAdditionalItemsMenu();
        }

        private List<AdditionalItemsDTO> GetAdditionalItemsMenu()
        {
            List<AdditionalItemsDTO> retVal = new List<AdditionalItemsDTO>();

            List<Additional_Items> additionalItems = db.Additional_Items.Where(obj => obj.hotelID == _hotel.hotelID).ToList();

            additionalItems.ForEach(a =>
            {
                AdditionalItemsDTO additionalItemDTO = new AdditionalItemsDTO();
                additionalItemDTO.SetAdditionalItemsDTO(a);
                retVal.Add(additionalItemDTO);
            });

            return retVal;
        }

        private List<AlcoholDTO> GetAlcoholMenu()
        {
            List<AlcoholDTO> retVal = new List<AlcoholDTO>();

            List<Food_And_Drinks> alcohol = db.Food_And_Drinks.Where(obj => obj.hotelID == _hotel.hotelID && obj.Alcohol != null).ToList();

            alcohol.ForEach(a =>
            {
                AlcoholDTO alcoholDTO = new AlcoholDTO();
                alcoholDTO.SetAlcoholDTO(a);
                retVal.Add(alcoholDTO);
            });

            return retVal;
        }

        private List<DrinksDTO> GetDrinksMenu()
        {
            List<DrinksDTO> retVal = new List<DrinksDTO>();

            List<Food_And_Drinks> food = db.Food_And_Drinks.Where(obj => obj.hotelID == _hotel.hotelID && obj.Drink != null).ToList();

            food.ForEach(d =>
            {
                DrinksDTO drinkDTO = new DrinksDTO();
                drinkDTO.SetDrinksDTO(d);
                retVal.Add(drinkDTO);
            });

            return retVal;
        }

        private List<FoodDTO> GetFoodMenu()
        {
            List<FoodDTO> retVal = new List<FoodDTO>();

            List<Food_And_Drinks> food = db.Food_And_Drinks.Where(obj => obj.hotelID == _hotel.hotelID && obj.Food != null).ToList();

            food.ForEach(f =>
            {
                FoodDTO foodDTO = new FoodDTO();
                foodDTO.SetFoodDTO(f);
                retVal.Add(foodDTO);
            });

            return retVal;
        }

        private List<ActivityHotelDTO> GetHotelActivities()
        {
            List<ActivityHotelDTO> retVal = new List<ActivityHotelDTO>();

            List<Activity_hotel> activities = db.Activity_hotel.Where(obj => obj.hotelID == _hotel.hotelID).ToList();

            activities.ForEach(a =>
            {
                ActivityHotelDTO activityHotelDTO = new ActivityHotelDTO();
                activityHotelDTO.SetActivityHotelDTO(a);
                retVal.Add(activityHotelDTO);
            });

            return retVal;
        }

        private List<FacilityDTO> GetHotelFacilities()
        {
            List<FacilityDTO> retVal = new List<FacilityDTO>();

            List<Facility> facilities = db.Facilities.Where(obj => obj.hotelID == _hotel.hotelID).ToList();

            facilities.ForEach(f =>
            {
                FacilityDTO facilityDTO = new FacilityDTO();
                facilityDTO.setFacilityDTO(f);
                retVal.Add(facilityDTO);
            });

            return retVal;
        }

        private List<TherapyDTO> GetSpaTherapies()
        {
            List<TherapyDTO> retVal = new List<TherapyDTO>();

            List<Therapy> therapies = db.Therapies.Where(obj => obj.hotelID == _hotel.hotelID).ToList();

            therapies.ForEach(t =>
            {
                TherapyDTO theraphyDTO = new TherapyDTO();
                theraphyDTO.SetTherapyDTO(t);
                retVal.Add(theraphyDTO);
            });

            return retVal;
        }
    }
}
