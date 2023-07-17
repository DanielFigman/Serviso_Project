using DATA.Exceptions;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class HotelServicesHelper
    {
        private readonly HelperFunctions dataHelper = new HelperFunctions();
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public void DeleteService(string type, int hotelID, int itemID)
        {
            switch (type)
            {
                case "Food_And_Drink":
                    DeleteFoodAndDrinks(type, hotelID, itemID);
                    return;
                case "Additional_Items":
                    DeleteAdditionalItem(type, hotelID, itemID);
                    return;
                case "Therapy":
                    DeleteTherapy(type, hotelID, itemID);
                    return;
                case "Facility":
                    DeleteFacility(type, hotelID, itemID);
                    return;
                case "Activity":
                    DeleteActivity(type, hotelID, itemID);
                    return;
                default:
                    throw new InvalidJsonSchemaException("Deleted type should be one of the following: [Food_And_Drink, Additional_Items, Therapy, Facility, Activity]");
            }
        }
        private void DeleteActivity(string type, int hotelID, int itemID)
        {
            Activity_hotel itemToDelete = db.Activity_hotel.FirstOrDefault(obj => obj.hotelID == hotelID && obj.placeID == itemID);
            if (itemToDelete != null)
            {
                itemToDelete.isDeleted = true;
            }
            else
            {
                throw new InvalidJsonSchemaException($"Item: {type} with id: {itemID} has not been found for hotel: {hotelID}");
            }
            db.Activity_hotel.AddOrUpdate(itemToDelete);
            db.SaveChanges();
        }
        private void DeleteFacility(string type, int hotelID, int itemID)
        {
            Facility itemToDelete = db.Facilities.FirstOrDefault(obj => obj.hotelID == hotelID && obj.facilityID == itemID);
            if (itemToDelete != null)
            {
                itemToDelete.isDeleted = true;
            }
            else
            {
                throw new InvalidJsonSchemaException($"Item: {type} with id: {itemID} has not been found for hotel: {hotelID}");
            }
            db.Facilities.AddOrUpdate(itemToDelete);
            db.SaveChanges();
        }
        private void DeleteTherapy(string type, int hotelID, int itemID)
        {
            Therapy itemToDelete = db.Therapies.FirstOrDefault(obj => obj.hotelID == hotelID && obj.therapyID == itemID);
            if (itemToDelete != null)
            {
                itemToDelete.isDeleted = true;
            }
            else
            {
                throw new InvalidJsonSchemaException($"Item: {type} with id: {itemID} has not been found for hotel: {hotelID}");
            }
            db.Therapies.AddOrUpdate(itemToDelete);
            db.SaveChanges();
        }
        private void DeleteAdditionalItem(string type, int hotelID, int itemID)
        {
            Additional_Items itemToDelete = db.Additional_Items.FirstOrDefault(obj => obj.hotelID == hotelID && obj.ID == itemID);
            if (itemToDelete != null)
            {
                itemToDelete.isDeleted = true;
            }
            else
            {
                throw new InvalidJsonSchemaException($"Item: {type} with id: {itemID} has not been found for hotel: {hotelID}");
            }
            db.Additional_Items.AddOrUpdate(itemToDelete);
            db.SaveChanges();
        }
        private void DeleteFoodAndDrinks(string type, int hotelID, int itemID)
        {
            Food_And_Drinks itemToDelete = db.Food_And_Drinks.FirstOrDefault(obj => obj.hotelID == hotelID && obj.ID == itemID);
            if (itemToDelete != null)
            {
                itemToDelete.isDeleted = true;
            }
            else
            {
                throw new InvalidJsonSchemaException($"Item: {type} with id: {itemID} has not been found for hotel: {hotelID}");
            }
            db.Food_And_Drinks.AddOrUpdate(itemToDelete);
            db.SaveChanges();
        }

        public void UpdateService(JObject product, int hotelID)
        {
            Dictionary<string, object> convertedDict = dataHelper.ConvertJsonToDictionary(product);
            
            if (convertedDict.ContainsKey("Food_And_Drinks"))
            {
                Dictionary<string, object> food = (Dictionary<string, object>)convertedDict["Food_And_Drinks"];
                AddOrUpdateFood(food, hotelID);
            }

            if (convertedDict.ContainsKey("Additional_Items"))
            {
                Dictionary<string, object> additionalItems = (Dictionary<string, object>)convertedDict["Additional_Items"];
                AddOrAddUpdateitionalItems(additionalItems, hotelID);
            }

            if (convertedDict.ContainsKey("Therapy"))
            {
                Dictionary<string, object> therapy = (Dictionary<string, object>)convertedDict["Therapy"];
                AddOrUpdateTherapy(therapy, hotelID);
            }

            if (convertedDict.ContainsKey("Facility"))
            {
                Dictionary<string, object> facility = (Dictionary<string, object>)convertedDict["Facility"];
                AddOrUpdateFacility(facility, hotelID);
            }

            if (convertedDict.ContainsKey("Activity"))
            {
                Dictionary<string, object> activity = (Dictionary<string, object>)convertedDict["Activity"];
                AddOrUpdateHotelActivity(activity, hotelID);
            }
        }

        public void AddOrUpdateHotelActivity(Dictionary<string, object> acivityObject, int hotelID)
        {
            Activity newOrUpdatedActivity = dataHelper.CreateObjectFromDictionary<Activity>(acivityObject);

            if(newOrUpdatedActivity != null)
            {

                if(newOrUpdatedActivity.Activity_hotel == null)
                {
                    throw new InvalidJsonSchemaException("Activiy object must have a nested Activity_hotel or Activity_nearBy object");
                }

                Activity activity = new Activity();

                if(newOrUpdatedActivity.placeID != 0)
                {
                    activity = db.Activities.FirstOrDefault(obj => obj.placeID == newOrUpdatedActivity.placeID);
                    activity.Activity_hotel = db.Activity_hotel.FirstOrDefault(obj => obj.placeID == newOrUpdatedActivity.placeID);
                }
                else
                {
                    int newID = db.Activities.ToList().Count() + 1;
                    while (db.Activities.FirstOrDefault(obj => obj.placeID == newID) != null)
                    {
                        newID++;
                    }
                    newOrUpdatedActivity.placeID = newID;
                    newOrUpdatedActivity.Activity_nearBY.placeID = newID;
                }

                newOrUpdatedActivity.Activity_hotel.hotelID = hotelID;

                dataHelper.SetObjectValuesFromObjectWithoutNull(activity, newOrUpdatedActivity);
                db.Activities.AddOrUpdate(activity);
                db.SaveChanges();
            } 
            else
            {
                throw new InvalidJsonSchemaException();
            }
        }
        public void AddOrUpdateFacility(Dictionary<string, object> facilityObject, int hotelID)
        {
            Facility newOrUpdatedFacility = dataHelper.CreateObjectFromDictionary<Facility>(facilityObject);

            if (newOrUpdatedFacility != null)
            {
                Facility facility = new Facility();

                if (newOrUpdatedFacility.facilityID != 0)
                {
                    facility = db.Facilities.FirstOrDefault(obj => obj.facilityID == newOrUpdatedFacility.facilityID);
                }
                else
                {
                    int newID = db.Facilities.ToList().Count() + 1;
                    while (db.Facilities.FirstOrDefault(obj => obj.facilityID == newID) != null)
                    {
                        newID++;
                    }
                    newOrUpdatedFacility.facilityID = newID;
                }

                newOrUpdatedFacility.hotelID = hotelID;

                dataHelper.SetObjectValuesFromObjectWithoutNull(facility, newOrUpdatedFacility);
                db.Facilities.AddOrUpdate(facility);
                db.SaveChanges();
            }
            else
            {
                throw new InvalidJsonSchemaException();
            }
        }

        private void AddOrUpdateTherapy(Dictionary<string, object> therapyObject, int hotelID)
        {
            Therapy newOrUpdatedTherapy = dataHelper.CreateObjectFromDictionary<Therapy>(therapyObject);

            if (newOrUpdatedTherapy != null)
            {
                Therapy therapy = new Therapy();

                if (newOrUpdatedTherapy.therapyID != 0)
                {
                    therapy = db.Therapies.FirstOrDefault(obj => obj.therapyID == newOrUpdatedTherapy.therapyID);
                }
                else
                {
                    int newID = db.Therapies.ToList().Count() + 1;
                    while (db.Therapies.FirstOrDefault(obj => obj.therapyID == newID) != null)
                    {
                        newID++;
                    }
                    newOrUpdatedTherapy.therapyID = newID;
                }

                newOrUpdatedTherapy.hotelID = hotelID;

                dataHelper.SetObjectValuesFromObjectWithoutNull(therapy, newOrUpdatedTherapy);
                db.Therapies.AddOrUpdate(therapy);
                db.SaveChanges();
            }

        }
        private void AddOrAddUpdateitionalItems(Dictionary<string, object> additionalItemsObject, int hotelID)
        {
            Additional_Items newOrUpdatedAdditionalItem = dataHelper.CreateObjectFromDictionary<Additional_Items>(additionalItemsObject);

            if (newOrUpdatedAdditionalItem != null)
            {
                Additional_Items additionalItems = new Additional_Items();

                if (newOrUpdatedAdditionalItem.ID != 0)
                {
                    additionalItems = db.Additional_Items.FirstOrDefault(obj => obj.ID == newOrUpdatedAdditionalItem.ID);
                }
                else
                {
                    int newID = db.Additional_Items.ToList().Count() + 1;
                    while (db.Additional_Items.FirstOrDefault(obj => obj.ID == newID) != null)
                    {
                        newID++;
                    }
                    newOrUpdatedAdditionalItem.ID = newID;
                }

                newOrUpdatedAdditionalItem.hotelID = hotelID;

                dataHelper.SetObjectValuesFromObjectWithoutNull(additionalItems, newOrUpdatedAdditionalItem);
                db.Additional_Items.AddOrUpdate(additionalItems);
                db.SaveChanges();
            }
            else
            {
                throw new InvalidJsonSchemaException();
            }

        }
        private int AddOrUpdateFood(Dictionary<string, object> foodObject, int hotelID)
        {

            Food_And_Drinks newOrUpdatedFood = dataHelper.CreateObjectFromDictionary<Food_And_Drinks>(foodObject);


            if (newOrUpdatedFood != null)
            {
                newOrUpdatedFood.hotelID = hotelID;

                if (newOrUpdatedFood.Food == null && newOrUpdatedFood.Drink == null && newOrUpdatedFood.Alcohol == null)
                {
                    throw new InvalidJsonSchemaException("Food_And_Drinks object must have one of the following list: [Food, Drink, Alcohol]");
                }

                if(newOrUpdatedFood.hotelID == 0)
                {
                    throw new InvalidJsonSchemaException("Food_And_Drinks object must have hotelID");
                }

                Food_And_Drinks food = new Food_And_Drinks();

                if (newOrUpdatedFood.ID != 0)
                {
                    food = db.Food_And_Drinks.FirstOrDefault(obj => obj.ID == newOrUpdatedFood.ID);

                    if (newOrUpdatedFood.Food != null)
                    {
                        food.Food = db.Foods.FirstOrDefault(obj => obj.ID == newOrUpdatedFood.ID);
                    }

                    if (newOrUpdatedFood.Drink != null)
                    {
                        food.Drink = db.Drinks.FirstOrDefault(obj => obj.ID == newOrUpdatedFood.ID);
                    }

                    if (newOrUpdatedFood.Alcohol != null)
                    {
                        food.Alcohol = db.Alcohols.FirstOrDefault(obj => obj.ID == newOrUpdatedFood.ID);
                    }
                }
                else
                {
                    int newID = db.Food_And_Drinks.ToList().Count() + 1;
                    while (db.Food_And_Drinks.FirstOrDefault(obj => obj.ID == newID) != null)
                    {
                        newID++;
                    }
                    newOrUpdatedFood.ID = newID;

                    if (newOrUpdatedFood.Food != null)
                    {
                        newOrUpdatedFood.Food.ID = newID;
                    }

                    if (newOrUpdatedFood.Drink != null)
                    {
                        newOrUpdatedFood.Drink.ID = newID;
                    }

                    if (newOrUpdatedFood.Alcohol != null)
                    {
                        newOrUpdatedFood.Alcohol.ID = newID;
                    }
                }

                dataHelper.SetObjectValuesFromObjectWithoutNull(food, newOrUpdatedFood);
                db.Food_And_Drinks.AddOrUpdate(food);
                db.SaveChanges();

                return food.hotelID;
            }
            else
            {
                throw new InvalidJsonSchemaException();
            }
        }
    }
}
