using Nest;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class HouseHold_Custom_Request
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public bool MarkRequest()
        {
            isMarked = true;

            try
            {
                db.HouseHold_Custom_Request.AddOrUpdate(this);
                db.SaveChanges();

                Request request = db.Requests.FirstOrDefault(r => r.requestID == requestID);
                return request.CheckIfCloseIsNeeded();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
