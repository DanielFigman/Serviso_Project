using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class AdminDashboardDTO
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();
        private readonly int HotelID;
        public int SumOfRoomServiceOrders { get; set; }
        public int SumOfHouseholdRequests { get; set; }
        public Dictionary<string, object> Data { get; set; }

        public AdminDashboardDTO(int hotelID)
        {
            HotelID = hotelID;
            SumOfRoomServiceOrders = GetRoomServiceSum();
            SumOfHouseholdRequests = GetHouseholdSum();
            Data = GetData();
        }

        private int GetRoomServiceSum()
        {
            return db.Request_In_Order.Where(obj => obj.Order.hotelID == HotelID && obj.Request.Room_Service_Order != null).Count();
        }
        private int GetHouseholdSum()
        {
            return db.Request_In_Order.Where(obj => obj.Order.hotelID == HotelID && obj.Request.HouseHold_Request!= null && obj.Request.HouseHold_Request.HouseHold_Custom_Request.Any()).Count();
        }

        private Dictionary<string, object> GetData()
        {
            Dictionary<string, object> retVal = new Dictionary<string, object>();

            List<long> requestIDs = db.Request_In_Order.Where(obj => obj.Order.hotelID == HotelID).Select(x => x.requestID).ToList();

            var orderedFood = db.Food_And_Drinks_Room_Service
                .Where(obj => requestIDs.Contains(obj.requestID) && obj.Food_And_Drinks.Food != null)
                .Select(x => new
                {
                    Food = x.Food_And_Drinks.Food,
                    amount = x.amount
                })
                .ToList();

            var orderedDrink = db.Food_And_Drinks_Room_Service
                .Where(obj => requestIDs.Contains(obj.requestID) && obj.Food_And_Drinks.Drink != null)
                .Select(x => new
                {
                    Drink = x.Food_And_Drinks.Drink,
                    amount = x.amount
                })
                .ToList();

            var orderedAlcohol = db.Food_And_Drinks_Room_Service
                .Where(obj => requestIDs.Contains(obj.requestID) && obj.Food_And_Drinks.Alcohol != null)
                .Select(x => new
                {
                    Alcohol = x.Food_And_Drinks.Alcohol,
                    amount = x.amount
                })
                .ToList();

            var orderedAdditionalItems = db.Additional_Items_Room_Service
                .Where(obj => requestIDs.Contains(obj.requestID))
                .Select(x => new
                {
                    Additional_Items = x.Additional_Items,
                    amount = x.amount
                })
                .ToList();

            var customRequests = db.HouseHold_Custom_Request
                .Where(obj => requestIDs.Contains(obj.requestID))
                .Select(x => new
                {
                    customType = x.Custom_Request_Types,
                    amount = x.amount
                })
                .ToList();

            Dictionary<string, int?> foodOrders = new Dictionary<string, int?>();

            foreach (var item in orderedFood)
            {
                if (foodOrders.ContainsKey(item.Food.Food_And_Drinks.name))
                {
                    foodOrders[item.Food.Food_And_Drinks.name] += item.amount;
                }
                else
                {
                    foodOrders[item.Food.Food_And_Drinks.name] = item.amount;
                }
            }

            retVal["Ordered_Food"] = foodOrders;

            Dictionary<string, int?> drinksOrders = new Dictionary<string, int?>();

            foreach (var item in orderedDrink)
            {
                if (drinksOrders.ContainsKey(item.Drink.Food_And_Drinks.name))
                {
                    drinksOrders[item.Drink.Food_And_Drinks.name] += item.amount;
                }
                else
                {
                    drinksOrders[item.Drink.Food_And_Drinks.name] = item.amount;
                }
            }

            retVal["Ordered_Drinks"] = drinksOrders;

            Dictionary<string, int?> alcoholOrders = new Dictionary<string, int?>();

            foreach (var item in orderedAlcohol)
            {
                if (alcoholOrders.ContainsKey(item.Alcohol.Food_And_Drinks.name))
                {
                    alcoholOrders[item.Alcohol.Food_And_Drinks.name] += item.amount;
                }
                else
                {
                    alcoholOrders[item.Alcohol.Food_And_Drinks.name] = item.amount;
                }
            }

            retVal["Ordered_Alcohol"] = alcoholOrders;

            Dictionary<string, int?> AdditionalItemsOrders = new Dictionary<string, int?>();

            foreach (var item in orderedAdditionalItems)
            {
                if (AdditionalItemsOrders.ContainsKey(item.Additional_Items.name))
                {
                    AdditionalItemsOrders[item.Additional_Items.name] += item.amount;
                }
                else
                {
                    AdditionalItemsOrders[item.Additional_Items.name] = item.amount;
                }
            }

            retVal["Ordered_AdditionalItems"] = AdditionalItemsOrders;

            Dictionary<string, int?> customRequestsOrdered = new Dictionary<string, int?>();

            foreach (var customRequest in customRequests)
            {
                string name = "";
                if (customRequest.customType.name == "CUSTOM")
                {
                    name = customRequest.customType.HouseHold_Custom_Request.FirstOrDefault()?.description.ToLower() ?? "custom";
                }
                else
                {
                    name = customRequest.customType.name;
                }

                if (customRequestsOrdered.ContainsKey(name))
                {
                    customRequestsOrdered[name] += customRequest.amount;
                }
                else
                {
                    customRequestsOrdered[name] = customRequest.amount;
                }
            }

            retVal["Custom_Requests"] = customRequestsOrdered;

            return retVal;
        }

    }
}
