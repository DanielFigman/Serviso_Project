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
            Activity_Update activityUpdate = db.Activity_Update.FirstOrDefault(obj => obj.placeID == placeId && obj.email == email);

            if (activityUpdate == null)
            {
                placeID = placeId;
                this.email = email;
            }
            else
            {
                placeID = activityUpdate.placeID;
                this.email = activityUpdate.email;
                favorite = activityUpdate.favorite;
                rating = activityUpdate.rating;
            }
        }

        public void SetRatingAndFav(int? rating, bool? fav)
        {
            this.rating = rating;
            favorite = fav;

            SaveChanges();
        }

        private void SaveChanges()
        {
            db.Activity_Update.AddOrUpdate(this);
            db.SaveChanges();
        }
    }
}
