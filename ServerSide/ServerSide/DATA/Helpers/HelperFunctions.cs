using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;



namespace DATA
{
    public class HelperFunctions
    {

        public T CreateObjectFromDictionary<T>(Dictionary<string, object> dict) where T : class, new()
        {
          
                T obj = new T();
                var properties = typeof(T).GetProperties();

                foreach (var property in properties)
                {
                    if (dict.ContainsKey(property.Name))
                    {
                        if (property.PropertyType == typeof(DateTime))
                        {
                            property.SetValue(obj, Convert.ToDateTime(dict[property.Name]));
                        }
                        else
                        {
                            property.SetValue(obj, Convert.ChangeType(dict[property.Name], property.PropertyType));
                        }
                    }
                }

                User u = obj as User;
                if(u != null)
                {
                    try
                    {
                        EncryptPassword(u, dict["password"].ToString());
                    }
                    catch (Exception)
                    {

                        throw new MissingFieldException ("password must be sent for user creation");
                    }   
                }

                return obj;
        }


        public void EncryptPassword(User u, string password)
        {
                byte[] salt = new byte[16];
                new RNGCryptoServiceProvider().GetBytes(salt);

                var hashedPassword = new Rfc2898DeriveBytes(password, salt, 10000).GetBytes(20);

                u.PasswordValue = hashedPassword;
                u.SaltValue = salt;
        }

        public Dictionary<string, object> ConvertJsonToDictionary(JObject jsonObj)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            AddPropertiesToDictionary(jsonObj, dict);
            return dict;
        }

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

        public async Task<bool> SendVerificationCodeEmail(string recipientEmail, string emailBody, bool isEnglish)
        {

            string templateID = isEnglish ? "passwordReset_EN" : "passwordReset_HE";

            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.emailjs.com/api/v1.0/email/send");

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("user_id", "o-85Yh1PPT6Zd8mcx"),
                    new KeyValuePair<string, string>("service_id", "service_8x2c6oa"),
                    new KeyValuePair<string, string>("template_id", templateID),
                    new KeyValuePair<string, string>("recipient", recipientEmail),
                    new KeyValuePair<string, string>("text", emailBody)
                });

                request.Content = content;

                var response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    return true;
                }
            }
        }

        public string GetVerificationCode()
        {
            Random random = new Random();
            int code = random.Next(10000);
            string formattedCode = code.ToString("D4");

            return formattedCode;
        }
    }
}
