using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class TherapyDTO
    {
        public int therapyID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int? minDuration { get; set; }
        public double? basePrice { get; set; }
        public string tags { get; set; }
        public double? priceForAdditional15 { get; set; }
        public string imageURL { get; set; }


        public void SetTherapyDTO(Therapy therapy)
        {
            therapyID = therapy.therapyID;
            name = therapy.name;
            description = therapy.description;
            minDuration = therapy.minDuration;
            basePrice = therapy.basePrice;
            tags = therapy.tags;
            priceForAdditional15 = therapy.priceForAdditional15;
            imageURL = therapy.imageURL;
        }
    }
}
