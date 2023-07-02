using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ActivityMoreImage
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public void SetActivityMoreImage(string imageUrl, int placeID)
        {
            this.placeID = placeID;
            Url = imageUrl;
            ID = GetActivityMoreImageId();
        }

        private int GetActivityMoreImageId()
        {
            List<ActivityMoreImage> activitiesMoreImages = db.ActivityMoreImages.ToList();

            int retVal = activitiesMoreImages.Count() + 1;

            while (activitiesMoreImages.FirstOrDefault(obj => obj.ID == retVal) != null)
            {
                retVal += 1;
            }

            return retVal;
        }
    }
}
