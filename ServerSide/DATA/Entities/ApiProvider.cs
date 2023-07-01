using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ApiProvider
    {
        private hotelAppDBContextNew db = new hotelAppDBContextNew();

        public void CreateProvider(string providerName)
        {

            int newProviderId = db.ApiProviders.Count() + 1;

            while (db.ApiProviders.FirstOrDefault(obj => obj.ProviderId == newProviderId) != null)
            {
                newProviderId += 1;
            }

            ProviderId = newProviderId;
            ProviderName = providerName;

            db.ApiProviders.AddOrUpdate(this);
            db.SaveChanges();
        }
    }
}
