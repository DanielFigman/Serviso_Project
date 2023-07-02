using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{

    public partial class ApiRequestCount
    {
        private hotelAppDBContextNew db = new hotelAppDBContextNew();

        public void CreateApiRequestCount(int providerId, DateTime dateNow)
        {
            ProviderId = providerId;
            RequestDate = dateNow;
            RequestCount = 0;

            db.ApiRequestCounts.AddOrUpdate(this);
            db.SaveChanges();
        }

        public void SaveNewCount(int newCount)
        {
            RequestCount = newCount;

            db.ApiRequestCounts.AddOrUpdate(this);
            db.SaveChanges();
        }
    }
}
