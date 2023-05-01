using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class HouseCustomRequestDTO
    {
        public int requestID { get; set; }
        public int amount { get; set; }
        public string name { get; set; }
        public bool isMarked { get; set; }
        public Nullable<System.DateTime> requestDate { get; set; }
        public Nullable<System.TimeSpan> requestHour { get; set; }


        public void SetHouseCustomRequestDTO(HouseHold_Custom_Request request)
        {
            Request r = request.HouseHold_Request.Request;

            requestID = request.requestID;
            amount = request.amount;
            name = request.Custom_Request_Types.name;
            isMarked = false;
            requestDate = r.requestDate;
            requestHour = r.requestHour;
        }
    }
}
