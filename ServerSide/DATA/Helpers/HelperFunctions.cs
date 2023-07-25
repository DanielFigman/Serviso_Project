using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using DATA.Exceptions;
using Elasticsearch.Net.Specification.SearchableSnapshotsApi;
using Microsoft.Win32;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;



namespace DATA
{
    public class HelperFunctions
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        //creating Object from Dictionary
        public T CreateObjectFromDictionary<T>(Dictionary<string, object> dict) where T : class, new()
        {
            T obj = new T();
            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                if (dict.ContainsKey(property.Name))
                {
                    try
                    {
                        if (property.PropertyType.IsClass && !property.PropertyType.IsValueType && property.PropertyType != typeof(string)) // handle nested objects
                        {
                            var nestedDict = (Dictionary<string, object>)dict[property.Name];
                            if (nestedDict != null)
                            {
                                object nestedObj = Activator.CreateInstance(property.PropertyType);
                                nestedObj = GetType().GetMethod("CreateObjectFromDictionary").MakeGenericMethod(property.PropertyType).Invoke(this, new object[] { nestedDict });

                                property.SetValue(obj, nestedObj);
                            }
                        }
                        else if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>)) // handle nested collections
                        {
                            var nestedDictList = (List<object>)dict[property.Name];

                            if (nestedDictList != null)
                            {
                                Type elementType = property.PropertyType.GetGenericArguments()[0];

                                // create instance of the concrete ICollection implementation
                                Type concreteType = typeof(List<>).MakeGenericType(elementType);
                                var nestedCollectionObj = Activator.CreateInstance(concreteType);

                                foreach (var nestedDict in nestedDictList)
                                {
                                    object nestedObj = Activator.CreateInstance(elementType);
                                    nestedObj = GetType().GetMethod("CreateObjectFromDictionary").MakeGenericMethod(elementType).Invoke(this, new object[] { nestedDict });

                                    // add the nested object to the collection
                                    var addMethod = concreteType.GetMethod("Add");
                                    addMethod.Invoke(nestedCollectionObj, new object[] { nestedObj });
                                }

                                // set the property value to the nested collection
                                property.SetValue(obj, nestedCollectionObj);
                            }
                        }
                        else
                        {
                            property.SetValue(obj, Convert.ChangeType(dict[property.Name], property.PropertyType));
                        }
                    }
                    catch
                    {
                        throw new InvalidJsonSchemaException();
                    }
                }
            }

            // handle special case for User object
            User u = obj as User;
            if (u != null)
            {
                try
                {
                    EncryptPassword(u, dict["password"].ToString());
                }
                catch (Exception)
                {
                    throw new MissingFieldException("password must be sent for user creation");
                }
            }

            return obj;
        }


        //Encrypt user's password
        public void EncryptPassword(User u, string password)
        {
            byte[] salt = new byte[16];
            new RNGCryptoServiceProvider().GetBytes(salt);

            var hashedPassword = new Rfc2898DeriveBytes(password, salt, 10000).GetBytes(20);

            u.PasswordValue = hashedPassword;
            u.SaltValue = salt;
        }

        //Convert Json to Dictionary
        public Dictionary<string, object> ConvertJsonToDictionary(JObject jsonObj)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            AddPropertiesToDictionary(jsonObj, dict);
            return dict;
        }

        //setting the dictionary properties from the converJsonToDictionart function by recursicely adding the propertis in case of Object or List, or just setting the key and value if it is a simple value
        private void AddPropertiesToDictionary(JObject jsonObj, Dictionary<string, object> dict)
        {
            foreach (var property in jsonObj.Properties())
            {
                if (property.Value.Type == JTokenType.Object)
                {
                    // If the property is an object, recursively add its properties to the dictionary
                    var nestedObj = property.Value as JObject;
                    var nestedDict = new Dictionary<string, object>();
                    AddPropertiesToDictionary(nestedObj, nestedDict);
                    dict.Add(property.Name, nestedDict);
                }
                else if (property.Value.Type == JTokenType.Array)
                {
                    // If the property is an array, recursively add its items to the dictionary
                    var nestedArr = property.Value as JArray;
                    var nestedList = new List<object>();
                    foreach (var item in nestedArr)
                    {
                        if (item.Type == JTokenType.Object)
                        {
                            var nestedObj = item as JObject;
                            var nestedDict = new Dictionary<string, object>();
                            AddPropertiesToDictionary(nestedObj, nestedDict);
                            nestedList.Add(nestedDict);
                        }
                        else
                        {
                            nestedList.Add(item.Value<object>());
                        }
                    }
                    dict.Add(property.Name, nestedList);
                }
                else
                {
                    // If the property is a simple value, add it to the dictionary
                    dict.Add(property.Name, property.Value.Value<object>());
                }
            }
        }

        //sending an email through third party service of a verification code to the user
        public async Task<bool> SendVerificationCodeEmail(string recipientEmail, string name, string emailBody, bool isEnglish)
        {

            string templateID = isEnglish ? "passwordReset_EN" : "passwordReset_HE";

            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.emailjs.com/api/v1.0/email/send");

                var data = new
                {
                    user_id = "sBqE3GuIN5frQ4uEo",
                    service_id = "8x2c6oa",
                    template_id = templateID,
                    template_params = new
                    {
                        to_name = name,
                        message = emailBody,
                        to_email = recipientEmail
                    },
                };

                var json = JsonConvert.SerializeObject(data);
                request.Content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        //generates a 4 digit code
        public string GetVerificationCode()
        {
            Random random = new Random();
            int code = random.Next(10000);
            string formattedCode = code.ToString("D4");

            return formattedCode;
        }

        //setting propertis of object from same type of object instance
        public void SetObjectValuesFromObject<T>(T obj, T values)
        {
            // Get all the properties of the object
            PropertyInfo[] properties = typeof(T).GetProperties();

            // Loop through each property
            foreach (PropertyInfo property in properties)
            {
                // Get the value from the values object
                object value = property.GetValue(values);

                // Set the value of the property
                property.SetValue(obj, value);
            }
        }
        public void SetObjectValuesFromObjectWithoutNull<T>(T obj, T values)
        {
            // Get all the properties of the object
            PropertyInfo[] properties = typeof(T).GetProperties();

            // Loop through each property
            foreach (PropertyInfo property in properties)
            {
                // Get the value from the values object
                object value = property.GetValue(values);

                // Set the value of the property
                if (value != null)
                {
                    property.SetValue(obj, value);
                }
            }
        }

        public int GetOrderIdByRoomNumber(int roomNum, int hotelID)
        {
            int? retVal = db.Orders
                .Where(order => order.checkInDate <= DateTime.Now && order.checkOutDate >= DateTime.Now)
                .FirstOrDefault(order => order.Rooms.Any(r => r.roomNum == roomNum && r.hotelID == hotelID))
                ?.orderID;

            if (retVal == null)
            {
                throw new NonActiveRoom(roomNum);
            }

            return (int)retVal;
        }

        public List<string> GetClientByRequestId(long requestId)
        {
            List<string> retVal = new List<string>();

            Guest guest = db.Request_In_Order.Where(r => r.requestID == requestId).Select(r => r.Order.Guest).FirstOrDefault();

            if (guest != null)
            {
                string email = guest.User.email;
                retVal.Add(email);
            }

            return retVal;
        }

        public JObject GetClosedRequestNotification(long requestID)
        {
            List<string> items = db.HouseHold_Custom_Request
                .Where(request => request.requestID == requestID)
                .Select(request => request.Custom_Request_Types.name)
                .ToList();

            List<string> trimmedItems = items.Select(item => item.Replace("_", "")).ToList();

            Dictionary<string, object> data = new Dictionary<string, object>();

            JObject jsonObject = new JObject();
            jsonObject["title"] = "Your request has been fulfilled";
            jsonObject["body"] = $"The following items have been delivered: {string.Join(", ", trimmedItems)}";
            jsonObject["data"] = JObject.FromObject(data); // Convert the dictionary to a JObject

            return jsonObject;
        }

        public JObject GetCleaningCloseNotification(long requestID)
        {
            Request_In_Order requestInOrder = db.Request_In_Order.FirstOrDefault(obj => obj.requestID == requestID);
            Order order = requestInOrder?.Order;
            int? roomNum = order?.Rooms?.FirstOrDefault()?.roomNum;



            Dictionary<string, object> data = new Dictionary<string, object>();

            JObject jsonObject = new JObject(); 
            jsonObject["title"] = "Cleaning notification";
            jsonObject["body"] = roomNum != null ? $"Room {roomNum} has been cleaned" : "Your Room has been cleaned";
            jsonObject["data"] = JObject.FromObject(data); // Convert the dictionary to a JObject

            return jsonObject;
        }

        public JObject GetMessageNotification(string message)
        {

            Dictionary<string, object> data = new Dictionary<string, object>();

            JObject jsonObject = new JObject();
            jsonObject["title"] = "New meesage from reception";
            jsonObject["body"] = $"{message}";
            jsonObject["data"] = JObject.FromObject(data); // Convert the dictionary to a JObject

            return jsonObject;
        }

        public double GetLatitude(string landmark)
        {
            landmark = landmark.Trim('(', ')');
            string[] extractedLandMark = landmark.Split(',');

            return double.Parse(extractedLandMark[0].Trim());
        }

        public double GetLongitude(string landmark)
        {
            landmark = landmark.Trim('(', ')');
            string[] extractedLandMark = landmark.Split(',');

            return double.Parse(extractedLandMark[1].Trim());

        }

        public List<ActivityUpdateDTO> GetActivitiesUpdate(string email)
        {
            List<Activity_Update> activitiesUpdate = db.Activity_Update.Where(obj => obj.email == email).ToList();

            List<ActivityUpdateDTO> retVal = new List<ActivityUpdateDTO>();

            activitiesUpdate.ForEach(obj =>
            {
                ActivityUpdateDTO activityUpdateDTO = new ActivityUpdateDTO();
                activityUpdateDTO.SetActivityUpdateDTO(obj);
                retVal.Add(activityUpdateDTO);
            });

            return retVal;
        }
    }
}
