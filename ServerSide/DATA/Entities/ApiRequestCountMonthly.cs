using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ApiRequestCountMonthly
    {
        private hotelAppDBContextNew db = new hotelAppDBContextNew();

        public void CreateApiMonthlyRequestCount(int providerId, DateTime dateNow)
        {
            ProviderId = providerId;
            RequestMonth = dateNow;
            RequestCount = 0;

            db.ApiRequestCountMonthlies.AddOrUpdate(this);
            db.SaveChanges();
        }

        public void SaveNewCount(int newCount)
        {
            RequestCount = newCount;

            db.ApiRequestCountMonthlies.AddOrUpdate(this);
            db.SaveChanges();
        }
    }
}
