using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class ActivityMoreImagesDTO
    {
        public int imageID { get; set; }
        public string imageURL { get; set; }

        public void SetActivityMoreImagesDTO(ActivityMoreImage image)
        {
            imageID = image.ID;
            imageURL = image.Url;
        }
    }
}


