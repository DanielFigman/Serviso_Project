using DATA.Exceptions;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DATA
{
    public partial class Request
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        private readonly HelperFunctions dataHelper = new HelperFunctions();

        public bool CraeteNewRequestEntity(JObject data)
        {
            //converting the Json to a dictionary
            Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(data);

            SetNewRequestIdToObject(ref convertedDict);


            //creating an instance of Request based on the Json properties
            Request request = dataHelper.CreateObjectFromDictionary<Request>(convertedDict);


            //checking if there isn't an existing object with the same primary key like the created instance in the data base 
            Request findObjectWithThisID = db.Requests.Where(r => r.requestID == request.requestID).FirstOrDefault();

            if (findObjectWithThisID != null)
            {
                throw new ObjectAlreadyExist();
            }

            //setting the instnce object values to this 
            dataHelper.SetObjectValuesFromObject(this, request);


            db.Requests.Add(this);
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw new MissingFieldException();
            }

            return true;
        }

        public bool CraeteNewRequestEntity(int roomNum, int hotelID, JObject data)
        {
            //converting the Json to a dictionary
            Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(data);

            //getting the order ID based on the room number
            int orderID = dataHelper.GetOrderIdByRoomNumber(roomNum, hotelID);

            SetNewRequestIdToObject(ref convertedDict);

            if (convertedDict.ContainsKey("Request_In_Order"))
            {
                // add the orderID property to the "Request_In_Order" list
                List<object> requestInOrderList = (List<object>)convertedDict["Request_In_Order"];

                // checking the json schema
                if (requestInOrderList.Count() != 1)
                {
                    throw new InvalidJsonSchemaException();
                }

                Dictionary<string, object> requestInOrder = (Dictionary<string, object>)requestInOrderList[0];

                // adding the "orderID" key to the dictionary
                requestInOrder["orderID"] = orderID;
            }
            else
            {
                throw new InvalidJsonSchemaException();
            }



            //creating an instance of Request based on the Json properties
            Request request = dataHelper.CreateObjectFromDictionary<Request>(convertedDict);


            //checking if there isn't an existing object with the same primary key like the created instance in the data base 
            Request findObjectWithThisID = db.Requests.Where(r => r.requestID == request.requestID).FirstOrDefault();

            if (findObjectWithThisID != null)
            {
                throw new ObjectAlreadyExist();
            }

            //setting the instnce object values to this 
            dataHelper.SetObjectValuesFromObject(this, request);


            db.Requests.Add(this);
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw new MissingFieldException();
            }

            return true;
        }

        public bool CheckIfCloseIsNeeded()
        {
            List<HouseHold_Custom_Request> requests = db.HouseHold_Custom_Request.Where(r => r.requestID == requestID && r.isMarked != true).ToList();

            if (requests.Count == 0)
            {
                status = "closed";
                try
                {
                    db.Requests.AddOrUpdate(this);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    throw;
                }

            }

            return false;
        }

        public bool CheckIfRoomServiceCloseIsNeeded()
        {
            List<Food_And_Drinks_Room_Service> requests = db.Food_And_Drinks_Room_Service.Where(r => r.requestID == requestID && r.isMarked != true).ToList();

            if (requests.Count == 0)
            {
                status = "closed";
                try
                {
                    db.Requests.AddOrUpdate(this);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    throw;
                }

            }

            return false;
        }

        public bool CheckIfRoomServiceAdditilanCloseIsNeeded()
        {
            List<Additional_Items_Room_Service> requests = db.Additional_Items_Room_Service.Where(r => r.requestID == requestID && r.isMarked != true).ToList();

            if (requests.Count == 0)
            {
                status = "closed";
                try
                {
                    db.Requests.AddOrUpdate(this);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    throw;
                }

            }

            return false;
        }

        public void SetNewRequestIdToObject(ref Dictionary<string, Object> convertedDict)
        {
            long requestID = db.Requests.ToList().Count() + 1;

            while (db.Requests.FirstOrDefault(obj => obj.requestID == requestID) != null)
            {
                requestID++;
            }

            convertedDict["requestID"] = requestID;

            //always add request id to request in order
            AddRequestIdToRequestInOrder(ref convertedDict, requestID);

            if (convertedDict.ContainsKey("Room_Service_Order"))
            {
                AddRequestIdIfRoomServiceRequest(ref convertedDict, requestID);
            }
            else if (convertedDict.ContainsKey("HouseHold_Request"))
            {
                AddRequestIdIfHouseHoldRequest(ref convertedDict, requestID);
            }
        }

        private void AddRequestIdIfRoomServiceRequest(ref Dictionary<string, Object> convertedDict, long requestID)
        {
            object roomServiceOrderObj = convertedDict["Room_Service_Order"];
            if (roomServiceOrderObj is Dictionary<string, object> Room_Service_Order)
            {
                Room_Service_Order["requestID"] = requestID;

                if (Room_Service_Order.ContainsKey("Food_And_Drinks_Room_Service"))
                {
                    var foodAndDrinksRequest = Room_Service_Order["Food_And_Drinks_Room_Service"] as List<object>;
                    if (foodAndDrinksRequest != null)
                    {
                        foreach (var foodOrDrinkRequestObj in foodAndDrinksRequest)
                        {
                            if (foodOrDrinkRequestObj is Dictionary<string, object> foodOrDrinkRequestDict && foodOrDrinkRequestDict.ContainsKey("ID") && foodOrDrinkRequestDict.ContainsKey("amount"))
                            {
                                if (!foodOrDrinkRequestDict.ContainsKey("itemsCount"))
                                {
                                    throw new InvalidJsonSchemaException("Food and drinks must have itemCount key");
                                }

                                foodOrDrinkRequestDict["requestID"] = requestID;
                            }
                        }
                    }
                }

                if (Room_Service_Order.ContainsKey("Additional_Items_Room_Service"))
                {
                    var additionalItemsRequest = Room_Service_Order["Additional_Items_Room_Service"] as List<object>;
                    if (additionalItemsRequest != null)
                    {
                        foreach (var additionalItemRequestObj in additionalItemsRequest)
                        {
                            if (additionalItemRequestObj is Dictionary<string, object> additionalItemRequestDict && additionalItemRequestDict.ContainsKey("ID") && additionalItemRequestDict.ContainsKey("amount"))
                            {
                                additionalItemRequestDict["requestID"] = requestID;
                            }
                        }
                    }
                }
            }
        }

        private void AddRequestIdToRequestInOrder(ref Dictionary<string, Object> convertedDict, long requestID)
        {
            if (!convertedDict.ContainsKey("Request_In_Order"))
            {
                List<object> requestInOrderList = new List<object>();

                Dictionary<string, object> requestInOrder = new Dictionary<string, object>
                {
                    // adding the "requestID" key to the dictionary
                    ["requestID"] = requestID
                };


                requestInOrderList.Add(requestInOrder);



                convertedDict["Request_In_Order"] = requestInOrderList;
            }
            else
            {
                // add the orderID property to the "Request_In_Order" list
                List<object> requestInOrderList = (List<object>)convertedDict["Request_In_Order"];

                // checking the json schema
                if (requestInOrderList.Count() != 1)
                {
                    throw new InvalidJsonSchemaException();
                }

                Dictionary<string, object> requestInOrder = (Dictionary<string, object>)requestInOrderList[0];

                // adding the "orderID" key to the dictionary
                requestInOrder["requestID"] = requestID;
            }
        }

        private void AddRequestIdIfHouseHoldRequest(ref Dictionary<string, Object> convertedDict, long requestID)
        {
            object houseHoldRequestObj = convertedDict["HouseHold_Request"];
            if (houseHoldRequestObj is Dictionary<string, object> HouseHold_Request)
            {
                HouseHold_Request["requestID"] = requestID;

                if (HouseHold_Request.ContainsKey("HouseHold_Custom_Request"))
                {
                    var houseHoldCustomRequests = HouseHold_Request["HouseHold_Custom_Request"] as List<object>;
                    if (houseHoldCustomRequests != null)
                    {
                        foreach (var customRequestObj in houseHoldCustomRequests)
                        {
                            if (customRequestObj is Dictionary<string, object> customRequestDict && customRequestDict.ContainsKey("typeID") && customRequestDict.ContainsKey("amount"))
                            {
                                customRequestDict["requestID"] = requestID;
                            }
                        }
                    }
                }
            }
        }
    }
}
