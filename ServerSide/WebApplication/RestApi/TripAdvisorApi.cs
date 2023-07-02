using DATA;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;


namespace WebApplication
{
    public class TripAdvisorApi
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        private string ApiKey => "56016D3C32424CAD9BAE04BFE6AA4F8A";
        private string ProviderName => "TripAdvisor";
        private int DailyMax => 500;
        private int MonthlyMax => 4500;

        public int ProviderId;
        public int DailyRequestsCount;
        public int MonthlyRequestsCont;

        public ApiRequestCount ApiRequestCount;
        public ApiRequestCountMonthly ApiRequestCountMonthly;


        public TripAdvisorApi()
        {
            SetProvider();
        }


        private void SetProvider()
        {
            ApiProvider provider = db.ApiProviders.FirstOrDefault(obj => obj.ProviderName == ProviderName);
            DateTime dateNow = DateTime.Now.Date;

            ApiRequestCount apiRequestCount;
            ApiRequestCountMonthly apiRequestCountMonthly;

            if (provider != null)
            {
                int currentMonth = dateNow.Month;
                int currentYear = dateNow.Year;

                apiRequestCount = db.ApiRequestCounts.FirstOrDefault(obj =>
                    obj.ProviderId == provider.ProviderId &&
                    DbFunctions.TruncateTime(obj.RequestDate) == dateNow
                );

                apiRequestCountMonthly = db.ApiRequestCountMonthlies.FirstOrDefault(obj =>
                    obj.ProviderId == provider.ProviderId &&
                    obj.RequestMonth.Month == currentMonth &&
                    obj.RequestMonth.Year == currentYear
                );

                if (apiRequestCount == null)
                {
                    apiRequestCount = new ApiRequestCount();
                    apiRequestCount.CreateApiRequestCount(provider.ProviderId, dateNow);
                }

                if (apiRequestCountMonthly == null)
                {
                    apiRequestCountMonthly = new ApiRequestCountMonthly();
                    apiRequestCountMonthly.CreateApiMonthlyRequestCount(provider.ProviderId, dateNow);
                }
            }
            else
            {
                provider.CreateProvider(ProviderName);

                apiRequestCount = new ApiRequestCount();
                apiRequestCount.CreateApiRequestCount(provider.ProviderId, dateNow);

                apiRequestCountMonthly = new ApiRequestCountMonthly();
                apiRequestCountMonthly.CreateApiMonthlyRequestCount(provider.ProviderId, dateNow);
            }

            ProviderId = provider.ProviderId;

            DailyRequestsCount = apiRequestCount?.RequestCount ?? 0;
            ApiRequestCount = apiRequestCount;

            MonthlyRequestsCont = apiRequestCountMonthly?.RequestCount ?? 0;
            ApiRequestCountMonthly = apiRequestCountMonthly;
        }


        private async Task<int?> GetLocationID(ActivityNearByDTO activityNearBy)
        {
            string urlEncodedString = GetUrlEncodedString(activityNearBy.name);


            var options = new RestClientOptions($"https://api.content.tripadvisor.com/api/v1/location/search?key={ApiKey}&searchQuery={urlEncodedString}&address=Israel&language=en");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            var response = await client.GetAsync(request);

            int? locationId = null;

            if (response.IsSuccessful)
            {
                var content = response.Content;
                if (content != null)
                {
                    // Parse the response content and retrieve the location ID
                    var responseObject = JObject.Parse(content);

                    if (responseObject.ContainsKey("data"))
                    {
                        var data = responseObject["data"].FirstOrDefault();
                        if (data != null && data["location_id"] != null)
                        {
                            locationId = int.Parse(data["location_id"].ToString());
                        }
                    }
                }
            }

            AddRequestToCount();

            return locationId;
        }

        public async Task<List<string>> GetLocationImages(int? locationId)
        {
            List<string> retVal = new List<string>();

            if (locationId != null)
            {
                var options = new RestClientOptions($"https://api.content.tripadvisor.com/api/v1/location/{locationId}/photos?key={ApiKey}&language=en");
                var client = new RestClient(options);
                var request = new RestRequest("");
                request.AddHeader("accept", "application/json");
                var response = await client.GetAsync(request);

                if (response.IsSuccessful)
                {
                    var content = response.Content;
                    if (content != null)
                    {
                        // Parse the response content and retrieve the large image URLs
                        var responseObject = JObject.Parse(content);

                        if (responseObject.ContainsKey("data"))
                        {
                            var dataArray = (JArray)responseObject["data"];

                            foreach (var dataItem in dataArray)
                            {
                                var images = dataItem["images"];
                                var largeImage = images["large"];
                                var largeImageUrl = (string)largeImage["url"];

                                retVal.Add(largeImageUrl);
                            }
                        }
                    }
                }
                AddRequestToCount();
            }

            return retVal;
        }

        public async Task SetLocationIdsAndMorePhotos(List<ActivityNearByDTO> activities_nearBy)
        {
            if (DailyRequestsCount < DailyMax && MonthlyRequestsCont < MonthlyMax)
            {
                try
                {
                    foreach (var item in activities_nearBy)
                    {
                        if (item.tripAdvisorLocationId == null && !item.IsNotFoundLocationId(db))
                        {
                            int? locationId = await GetLocationID(item);
                            item.AddLocationIdToActicity(locationId, db);
                        }

                        if (item.morePhotosUrls.Count == 0 && item.tripAdvisorLocationId != null)
                        {
                            List<string> moreImages = await GetLocationImages(item.tripAdvisorLocationId);
                            item.AddMoreImagesToActivity(moreImages, db);
                        }
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
        }

        private string GetUrlEncodedString(string name)
        {
            // Remove special characters and spaces, keep only words and numbers
            string cleanedString = Regex.Replace(name, "[^a-zA-Z0-9]+", " ");

            // URL encode the cleaned string and add double quotes
            string urlEncodedString = Uri.EscapeDataString(cleanedString);
            urlEncodedString = "%22" + urlEncodedString + "%22";

            return urlEncodedString;
        }

        private void UpdateTheNewCounts()
        {
            ApiRequestCount.SaveNewCount(DailyRequestsCount);
            ApiRequestCountMonthly.SaveNewCount(MonthlyRequestsCont);
        }

        private void AddRequestToCount()
        {
            DailyRequestsCount += 1;
            MonthlyRequestsCont += 1;
        }
    }
}