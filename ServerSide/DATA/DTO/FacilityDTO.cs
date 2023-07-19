using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DATA.DTO
{
    public class FacilityDTO
    {
        public int facilityID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string contactNumber { get; set; }
        public string imageURL { get; set; }
        public int? hotelID { get; set; }
        public string type { get; set; }
        public string openingHours { get; set; }
        public bool? isDeleted { get; set; }


        public void setFacilityDTO(Facility facility)
        {
            facilityID = facility.facilityID;
            name = facility.name;
            description = facility.description;
            contactNumber = facility.contactNumber;
            imageURL = facility.imageURL;
            hotelID = facility.hotelID;
            type = facility.type;
            openingHours = facility.openingHours;
            isDeleted = facility.isDeleted;
        }

        public Dictionary<string, string> GetFacilityToTranslate()
        {
            Dictionary<string, string> retVal = new Dictionary<string, string>();
            retVal["name"] = name;
            retVal["description"] = description;

            return retVal;
        }
    }
}
