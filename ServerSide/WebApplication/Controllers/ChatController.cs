using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class ChatController : ApiController
    {
        private readonly HelperFunctions dataHelpers = new HelperFunctions();
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        [HttpPost]
        [Route("api/translateMessage")]
        public async Task<IHttpActionResult> Post([FromBody] JObject obj)
        {
            try
            {

                Dictionary<string, object> convertedDict = dataHelpers.ConvertJsonToDictionary(obj);
                if (convertedDict.ContainsKey("message") && convertedDict.ContainsKey("email"))
                {
                    string targetLanguage;
                    List<string> clients = new List<string>();

                    if (convertedDict["email"].ToString().ToLower() != "serviso4u@gmail.com")
                    {
                        string email = convertedDict["email"].ToString();
                        targetLanguage = db.Users.FirstOrDefault(user => user.email == email)?.Language.shortName;
                        clients.Add(email);
                    }
                    else
                    {
                        targetLanguage = "EN";
                    }

                    if (targetLanguage != null && targetLanguage != "")
                    {
                        AzureTranslatorApi azureTranslatorApi = new AzureTranslatorApi();
                        string retVal = await azureTranslatorApi.TranslateMessage(convertedDict["message"].ToString(), targetLanguage);

                        if (retVal != null && retVal != "")
                        {
                            PushNotifications p = new PushNotifications();

                            JObject notification = dataHelpers.GetMessageNotification(retVal);

                            _ = p.SendMessageToClientsAsync(clients, notification);
                        }

                        return Content(HttpStatusCode.OK, retVal);
                    }
                    else
                    {
                        throw new NonExistingUser(convertedDict["email"].ToString());
                    }

                }

                throw new Exception("Translate obj should have message and email of the target user");


            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
