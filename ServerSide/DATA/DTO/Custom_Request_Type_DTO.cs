using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DATA.DTO
{
    public class Custom_Request_Type_DTO
    {
        public int typeID { get; set; }
        public string name { get; set; }

        public void setCustom_Request_Type_DTO(Custom_Request_Types request)
        {
            typeID = request.typeID;
            name = request.name;    
        }

        public Dictionary<string, string> GetCustomRequestToTranslate()
        {
            Dictionary<string, string> retVal = new Dictionary<string, string>();
            retVal["name"] = name;

            return retVal;
        }
    }
}
