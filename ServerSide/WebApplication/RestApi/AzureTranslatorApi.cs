using DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using Microsoft.Ajax.Utilities;
using DATA.DTO;

namespace WebApplication
{
    public class AzureTranslatorApi : ApiProviderClass
    {

        private static readonly string ApiKey = "082fbcde768942f3bf1dd81a00614919";

        private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com";

        private static readonly string location = "westeurope";

        private static readonly int aproxCharsToTranslate = 20000;

        public AzureTranslatorApi() : base("AzureTranslator", 1500000)
        {

        }


        private async Task<string> Translate(string textToTranslate, string targetLanguage)
        {
            string route = $"/translate?api-version=3.0&to={targetLanguage}";
            object[] body = new object[] { new { Text = textToTranslate } };
            var requestBody = JsonConvert.SerializeObject(body);

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri(endpoint + route);
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", ApiKey);
                request.Headers.Add("Ocp-Apim-Subscription-Region", location);

                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                string result = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    dynamic translatedData = JsonConvert.DeserializeObject(result);
                    string translatedText = translatedData[0].translations[0].text;

                    AddCharsToCount(translatedText);

                    return translatedText;
                }
                else
                {
                    throw new Exception("Translation failed. Response: " + result);
                }
            }
        }

        public async Task<string> TranslateMessage(string str, string targetLanguage)
        {
            string retVal = await Translate(str, targetLanguage);
            return retVal;
        }
        public async Task TranslateLoginDTO(LoginDTO loginDTO)
        {
            try
            {
                if (MonthlyMax > MonthlyRequestsCont + aproxCharsToTranslate && loginDTO.languageShortName != "EN")
                {
                    string targetLanguage = loginDTO.languageShortName; // Set the desired target language

                    List<Task> translationTasks = new List<Task>
                {
                    TranslateActivitiesNearBy(targetLanguage, loginDTO),
                    TranslateActivitiesHotel(targetLanguage, loginDTO),
                    TranslateFacilitiesHotel(targetLanguage, loginDTO),
                    TranslateCustomRequests(targetLanguage, loginDTO),
                    TranslateTherapies(targetLanguage, loginDTO),
                    TranslateHotel(targetLanguage, loginDTO),
                    TranslateFood(targetLanguage, loginDTO),
                    TranslateDrinks(targetLanguage, loginDTO),
                    TranslateAlcohol(targetLanguage, loginDTO),
                    TranslateAdditionalItems(targetLanguage, loginDTO)
                };

                    await Task.WhenAll(translationTasks);
                    SetSuggestedActivities(loginDTO);
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                UpdateTheNewCounts();
            }
        }
        private void SetSuggestedActivities(LoginDTO loginDTO)
        {
            List<ActivityNearByDTO> activities = loginDTO.activities_nearBy;
            List<ActivityNearByDTO> sugeested = loginDTO.suggestedActivities;

            sugeested.ForEach(obj =>
            {
                ActivityNearByDTO tempActivity = activities.FirstOrDefault(a => a.placeID == obj.placeID);
                if (tempActivity != null)
                {
                    obj.name = tempActivity.name;
                    obj.description = tempActivity.description;
                    obj.address = tempActivity.address;
                    obj.tags = tempActivity.tags;
                }
            });
        }

        private async Task TranslateAdditionalItems(string targetLanguage, LoginDTO loginDTO)
        {
            List<AdditionalItemsDTO> additionalItems = loginDTO.additionalItems;

            var translationTasks = additionalItems.Select(async item =>
            {
                Dictionary<string, string> AdditionalItemToTranslate = item.GetAdditionalItemToTranslate();

                if (AdditionalItemToTranslate["name"] != null && AdditionalItemToTranslate["name"] is string)
                {
                    item.name = await Translate(AdditionalItemToTranslate["name"], targetLanguage);

                }
                if (AdditionalItemToTranslate["description"] != null && AdditionalItemToTranslate["description"] is string)
                {
                    item.description = await Translate(AdditionalItemToTranslate["description"], targetLanguage);

                }
                if (AdditionalItemToTranslate["tags"] != null && AdditionalItemToTranslate["tags"] is string)
                {
                    item.tags = await Translate(AdditionalItemToTranslate["tags"], targetLanguage);

                }
            });

            await Task.WhenAll(translationTasks);
        }
        private async Task TranslateAlcohol(string targetLanguage, LoginDTO loginDTO)
        {
            List<AlcoholDTO> alcohol = loginDTO.alcohol;

            var translationTasks = alcohol.Select(async drink =>
            {
                Dictionary<string, string> drinksToTranslate = drink.GetDrinkToTranslate();

                if (drinksToTranslate["name"] != null && drinksToTranslate["name"] is string)
                {
                    drink.name = await Translate(drinksToTranslate["name"], targetLanguage);

                }
                if (drinksToTranslate["allergies"] != null && drinksToTranslate["allergies"] is string)
                {
                    drink.allergies = await Translate(drinksToTranslate["allergies"], targetLanguage);

                }
                if (drinksToTranslate["tags"] != null && drinksToTranslate["tags"] is string)
                {
                    drink.tags = await Translate(drinksToTranslate["tags"], targetLanguage);

                }
            });

            await Task.WhenAll(translationTasks);
        }
        private async Task TranslateDrinks(string targetLanguage, LoginDTO loginDTO)
        {
            List<DrinksDTO> drinks = loginDTO.drinks;

            var translationTasks = drinks.Select(async drink =>
            {
                Dictionary<string, string> drinksToTranslate = drink.GetDrinkToTranslate();
                if (drinksToTranslate["name"] != null && drinksToTranslate["name"] is string)
                {
                    drink.name = await Translate(drinksToTranslate["name"], targetLanguage);

                }
                if (drinksToTranslate["allergies"] != null && drinksToTranslate["allergies"] is string)
                {
                    drink.allergies = await Translate(drinksToTranslate["allergies"], targetLanguage);

                }
                if (drinksToTranslate["tags"] != null && drinksToTranslate["tags"] is string)
                {
                    drink.tags = await Translate(drinksToTranslate["tags"], targetLanguage);

                }
            });

            await Task.WhenAll(translationTasks);
        }
        private async Task TranslateFood(string targetLanguage, LoginDTO loginDTO)
        {
            List<FoodDTO> foodList = loginDTO.food;

            var translationTasks = foodList.Select(async food =>
            {
                Dictionary<string, string> foodToTranslate = food.GetFoodToTranslate();
                if (foodToTranslate["name"] != null && foodToTranslate["name"] is string)
                {
                    food.name = await Translate(foodToTranslate["name"], targetLanguage);

                }
                if (foodToTranslate["description"] != null && foodToTranslate["description"] is string)
                {
                    food.description = await Translate(foodToTranslate["description"], targetLanguage);

                }
                if (foodToTranslate["possibleChanges"] != null && foodToTranslate["possibleChanges"] is string)
                {
                    food.possibleChanges = await Translate(foodToTranslate["possibleChanges"], targetLanguage);

                }
                if (foodToTranslate["allergies"] != null && foodToTranslate["allergies"] is string)
                {
                    food.allergies = await Translate(foodToTranslate["allergies"], targetLanguage);

                }
                if (foodToTranslate["tags"] != null && foodToTranslate["tags"] is string)
                {
                    food.tags = await Translate(foodToTranslate["tags"], targetLanguage);

                }
            });

            await Task.WhenAll(translationTasks);
        }

        private async Task TranslateHotel(string targetLanguage, LoginDTO loginDTO)
        {
            HotelDTO hotel = loginDTO.hotel;

            Dictionary<string, string> hotelToTranslate = hotel.GetHotelToTranslate();
            if (hotelToTranslate["name"] != null && hotelToTranslate["name"] is string)
            {
                hotel.name = await Translate(hotelToTranslate["name"], targetLanguage);
            }
            if (hotelToTranslate["address"] != null && hotelToTranslate["address"] is string)
            {
                hotel.address = await Translate(hotelToTranslate["address"], targetLanguage);
            }
        }

        private async Task TranslateTherapies(string targetLanguage, LoginDTO loginDTO)
        {
            List<TherapyDTO> therapies = loginDTO.therapies;

            var translationTasks = therapies.Select(async therapy =>
            {
                Dictionary<string, string> therapyToTranslate = therapy.GetTherapyToTranslate();
                if (therapyToTranslate["name"] != null && therapyToTranslate["name"] is string)
                {
                    therapy.name = await Translate(therapyToTranslate["name"], targetLanguage);
                }
                if (therapyToTranslate["description"] != null && therapyToTranslate["description"] is string)
                {
                    therapy.description = await Translate(therapyToTranslate["description"], targetLanguage);
                }
                if (therapyToTranslate["tags"] != null && therapyToTranslate["tags"] is string)
                {
                    therapy.tags = await Translate(therapyToTranslate["tags"], targetLanguage);
                }
            });

            await Task.WhenAll(translationTasks);
        }
        private async Task TranslateCustomRequests(string targetLanguage, LoginDTO loginDTO)
        {
            List<Custom_Request_Type_DTO> customRequestsType = loginDTO.custom_Request_Types;

            var translationTasks = customRequestsType.Select(async customType =>
            {
                Dictionary<string, string> customTypeToTranslate = customType.GetCustomRequestToTranslate();
                if (customTypeToTranslate["name"] != null && customTypeToTranslate["name"] is string)
                {
                    customType.name = await Translate(customTypeToTranslate["name"], targetLanguage);
                }
            });

            await Task.WhenAll(translationTasks);
        }

        private async Task TranslateFacilitiesHotel(string targetLanguage, LoginDTO loginDTO)
        {
            List<FacilityDTO> facilities = loginDTO.facilities;

            var translationTasks = facilities.Select(async facilityDTO =>
            {
                Dictionary<string, string> facilityToTranslate = facilityDTO.GetFacilityToTranslate();

                if (facilityToTranslate["name"] != null && facilityToTranslate["name"] is string)
                {
                    facilityDTO.name = await Translate(facilityToTranslate["name"], targetLanguage);
                }
                if (facilityToTranslate["description"] != null && facilityToTranslate["description"] is string)
                {
                    facilityDTO.description = await Translate(facilityToTranslate["description"], targetLanguage);
                }
            });

            await Task.WhenAll(translationTasks); // Wait for all tasks to complete asynchronously
        }

        private async Task TranslateActivitiesNearBy(string targetLanguage, LoginDTO loginDTO)
        {
            List<ActivityNearByDTO> activitiesNearBy = loginDTO.activities_nearBy;

            var translationTasks = activitiesNearBy.Select(async activityNearByDTO =>
            {
                Dictionary<string, string> activityToTranslate = activityNearByDTO.GetActivityNearByToTranslate();
                if (activityToTranslate["name"] != null && activityToTranslate["name"] is string)
                {
                    activityNearByDTO.name = await Translate(activityToTranslate["name"], targetLanguage);
                }
                if (activityToTranslate["description"] != null && activityToTranslate["description"] is string)
                {
                    activityNearByDTO.description = await Translate(activityToTranslate["description"], targetLanguage);
                }
                if (activityToTranslate["address"] != null && activityToTranslate["address"] is string)
                {
                    activityNearByDTO.address = await Translate(activityToTranslate["address"], targetLanguage);
                }
                if (activityToTranslate["tags"] != null && activityToTranslate["tags"] is string)
                {
                    activityNearByDTO.tags = await Translate(activityToTranslate["tags"], targetLanguage);
                }
            });

            await Task.WhenAll(translationTasks);
        }

        private async Task TranslateActivitiesHotel(string targetLanguage, LoginDTO loginDTO)
        {
            List<ActivityHotelDTO> activitiesHotel = loginDTO.activities_hotel;

            var translationTasks = activitiesHotel.Select(async activityHotelDTO =>
            {
                Dictionary<string, string> activityToTranslate = activityHotelDTO.GetActivityHotelToTranslate();
                if (activityToTranslate["name"] != null && activityToTranslate["name"] is string)
                {
                    activityHotelDTO.name = await Translate(activityToTranslate["name"], targetLanguage);
                }
                if (activityToTranslate["description"] != null && activityToTranslate["description"] is string)
                {
                    activityHotelDTO.description = await Translate(activityToTranslate["description"], targetLanguage);
                }
                if (activityToTranslate["tags"] != null && activityToTranslate["tags"] is string)
                {
                    activityHotelDTO.tags = await Translate(activityToTranslate["tags"], targetLanguage);
                }
            });

            await Task.WhenAll(translationTasks); // Wait for all tasks to complete asynchronously

        }

        protected void AddCharsToCount(string translatedText)
        {
            MonthlyRequestsCont += translatedText.Length;
            DailyRequestsCount += translatedText.Length;
        }
    }
}