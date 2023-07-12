using DATA;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace WebApplication
{
    public abstract class ApiProviderClass
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();
        protected string ProviderName { get; set; }
        protected int DailyMax { get; set; }
        protected int MonthlyMax { get; set; }

        protected int ProviderId { get; set; }
        protected int DailyRequestsCount { get; set; }
        protected int MonthlyRequestsCont { get; set; }

        protected ApiRequestCount ApiRequestCount { get; set; }
        protected ApiRequestCountMonthly ApiRequestCountMonthly { get; set; }

        protected ApiProviderClass(string providerName, int monthlyMax)
        {
            ProviderName = providerName;
            MonthlyMax = monthlyMax;
            SetProvider();
        }

        protected ApiProviderClass(string providerName, int monthlyMax, int dailyMax)
        {
            ProviderName = providerName;
            MonthlyMax = monthlyMax;
            DailyMax = dailyMax;
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
                provider = new ApiProvider();
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

        protected virtual void UpdateTheNewCounts()
        {
            ApiRequestCount.SaveNewCount(DailyRequestsCount);
            ApiRequestCountMonthly.SaveNewCount(MonthlyRequestsCont);
        }

        protected virtual void AddRequestToCount()
        {
            DailyRequestsCount += 1;
            MonthlyRequestsCont += 1;
        }

        protected virtual string GetUrlEncodedString(string name)
        {
            // Remove special characters and spaces, keep only words and numbers
            string cleanedString = Regex.Replace(name, "[^a-zA-Z0-9]+", " ");

            // URL encode the cleaned string and add double quotes
            string urlEncodedString = Uri.EscapeDataString(cleanedString);
            urlEncodedString = "%22" + urlEncodedString + "%22";

            return urlEncodedString;
        }
    }
}