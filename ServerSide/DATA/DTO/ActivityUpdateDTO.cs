using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class ActivityUpdateDTO
    {
        public int placeID { get; set; }
        public bool? favorite { get; set; }
        public double? rating { get; set; }

        public void SetActivityUpdateDTO(Activity_Update activityUpdate)
        {
            placeID = activityUpdate.placeID;
            favorite = activityUpdate.favorite;
            rating = activityUpdate.rating;
        }
    }
}
