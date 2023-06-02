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
            List<HouseHold_Custom_Request> requests = db.HouseHold_Custom_Request.Where(r => r.requestID == requestID && r.isMarked == false).ToList();

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
            convertedDict["requestID"] = requestID;

            if (convertedDict.ContainsKey("HouseHold_Request"))
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
    }
}
