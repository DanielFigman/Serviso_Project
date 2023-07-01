using DATA;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace WebApplication
{
    public class TripAdvisorApi
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        private string ApiKey => "56016D3C32424CAD9BAE04BFE6AA4F8A";
        private string ProviderName => "TripAdvisor";
        private int DailyMax => 1100;
        private int MonthlyMax => 4500;

        public int ProviderId;
        public int DailyRequestsCount;
        public int MonthlyRequestsCont;

        public TripAdvisorApi()
        {
            SetProvider();
        }


        private void SetProvider()
        {
            ApiProvider provider = db.ApiProviders.FirstOrDefault(obj => obj.ProviderName == ProviderName);
            DateTime dateNow = DateTime.Now.Date; // Get the current date without the time portion

            if (provider != null)
            {
                ProviderId = provider.ProviderId;

                int currentMonth = dateNow.Month;
                int currentYear = dateNow.Year;

                ApiRequestCount apiRequestCount = db.ApiRequestCounts.FirstOrDefault(obj =>
                    obj.ProviderId == provider.ProviderId &&
                    obj.RequestDate.Date == dateNow
                );

                ApiRequestCountMonthly apiRequestCountMonthly = db.ApiRequestCountMonthlies.FirstOrDefault(obj =>
                    obj.ProviderId == provider.ProviderId && 
                    obj.RequestMonth.Month == currentMonth &&
                    obj.RequestMonth.Year == currentYear
                );

                if (apiRequestCount != null)
                {
                    DailyRequestsCount = apiRequestCount.RequestCount != null ? (int)apiRequestCount.RequestCount : 0;
                }
                else
                {
                    apiRequestCount.CreateApiRequestCount(provider.ProviderId, dateNow);
                    DailyRequestsCount = (int)apiRequestCount.RequestCount;
                }

                if(apiRequestCountMonthly != null)
                {
                    MonthlyRequestsCont = apiRequestCountMonthly.RequestCount != null ? (int)apiRequestCountMonthly.RequestCount : 0;
                }
                else
                {
                    apiRequestCountMonthly.CreateApiMonthlyRequestCount(provider.ProviderId, dateNow);
                    MonthlyRequestsCont = (int)apiRequestCountMonthly.RequestCount;
                }


            }
            else
            {
                provider.CreateProvider(ProviderName);
                ProviderId = provider.ProviderId;

                ApiRequestCount apiRequestCount = new ApiRequestCount();
                apiRequestCount.CreateApiRequestCount(provider.ProviderId, dateNow);
                DailyRequestsCount = (int)apiRequestCount.RequestCount;

                ApiRequestCountMonthly apiRequestCountMonthly = new ApiRequestCountMonthly();
                apiRequestCountMonthly.CreateApiMonthlyRequestCount(provider.ProviderId, dateNow);
                MonthlyRequestsCont = (int)apiRequestCountMonthly.RequestCount;
            }
        }


        public async Task<string> GetLocationID(ActivityNearByDTO activityNearBy)
        {
            var client = new RestClient("https://api.content.tripadvisor.com/api/v1/location/search?key=56016D3C32424CAD9BAE04BFE6AA4F8A&searchQuery=%22Park%20Timna%22&address=Israel&latLong=23-24&radius=5&radiusUnit=km&language=en");
            var request = new RestRequest(Method.Get.ToString());
            request.AddHeader("accept", "application/json");
            RestResponse response = await client.ExecuteAsync(request);

            // Extract the location ID from the response
            string locationId = ""; // Set a default value or handle if no ID is found

            if (response.IsSuccessful) // Check if the response was successful
            {
                // Parse the response content and retrieve the location ID
                var content = response.Content;
                if(content != null && content.Contains("locationId"))
                {
                }
            }

            return locationId;
        }

        public async Task<List<string>> GetLocationImages(ActivityNearByDTO activityNearBy)
        {

        }
    }
}