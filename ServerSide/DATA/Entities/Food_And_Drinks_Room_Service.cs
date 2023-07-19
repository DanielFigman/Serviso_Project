using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    partial class Food_And_Drinks_Room_Service
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public bool MarkRequest()
        {
            isMarked = true;

            try
            {
                db.Food_And_Drinks_Room_Service.AddOrUpdate(this);
                db.SaveChanges();

                Request request = db.Requests.FirstOrDefault(r => r.requestID == requestID);
                return request.CheckIfRoomServiceCloseIsNeeded();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
