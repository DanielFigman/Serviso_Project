using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Activity_Update
    {
        private hotelAppDBContextNew db = new hotelAppDBContextNew();

        public Activity_Update()
        {

        }

        public Activity_Update(int placeId, string email)
        {
            Activity_Update activityUpdate = db.Activity_Update.FirstOrDefault(obj => obj.placeID == placeID && obj.email == email);

            if (activityUpdate == null)
            {
                placeID = placeId;
                this.email = email;
            }
        }

        public void SetFavorite()
        {
            if (favorite != null)
            {
                favorite = !favorite;
            } else
            {
                favorite = true;
            }

            SaveChanges();
        }

        public void SetRating(int rating)
        {
            this.rating = rating;
            SaveChanges();
        }

        private void SaveChanges()
        {
            db.Activity_Update.AddOrUpdate(this);
            db.SaveChanges();
        }
    }
}
