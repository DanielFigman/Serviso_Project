using System;
using System.Collections.Generic;
using System.Linq;
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
            try
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

                        throw new Exception ("password must be sent for user creation");
                    }
                    
                    
                }

                return obj;

            }
            catch (Exception)
            {
                
                throw;
            }
        }


        public void EncryptPassword(User u, string password)
        {
            try
            {
                byte[] salt = new byte[16];
                new RNGCryptoServiceProvider().GetBytes(salt);

                var hashedPassword = new Rfc2898DeriveBytes(password, salt, 10000).GetBytes(20);

                u.PasswordValue = hashedPassword;
                u.SaltValue = salt;

            }
            catch (Exception e)
            {
                throw;
            }

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
    }
}
