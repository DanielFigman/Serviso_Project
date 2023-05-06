using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class HouseCustomRequestDTO
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public long requestID { get; set; }
        public int amount { get; set; }
        public string name { get; set; }
        public bool isMarked { get; set; }
        public int roomNumber { get; set; }
        public DateTime? requestDate { get; set; }
        public TimeSpan? requestHour { get; set; }
        public DateTime? requestedDate { get; set; }
        public TimeSpan? requestedHour { get; set; }



        public void SetHouseCustomRequestDTO(HouseHold_Custom_Request request)
        {
            Request r = request.HouseHold_Request.Request;
  
            requestID = request.requestID;
            amount = request.amount;
            name = GetCustomRequestName(request);
            isMarked = false;
            requestDate = r.requestDate;
            requestHour = r.requestHour;
            roomNumber = GetRoomNumber(r);
            requestedDate = GetRequestedDate(r);
            requestedHour = GetRequestedHour(r);
        }


        private string GetCustomRequestName(HouseHold_Custom_Request request)
        {
            int typeCustom = db.Custom_Request_Types.FirstOrDefault(c => c.name == "CUSTOM").typeID;
            string retVal = "";

            if(request.typeID == typeCustom)
            {
                retVal = request.description ?? "";
            }
            else
            {
                retVal = request.Custom_Request_Types.name;
            }

            return retVal;
        }

        private int GetRoomNumber(Request request)
        {
            Order o = request.Request_In_Order.FirstOrDefault().Order;

            int roomNumber = -1;

            if (o != null)
            {
                roomNumber = o.Rooms.FirstOrDefault().roomNum;
            }

            return roomNumber;
        }

        private DateTime? GetRequestedDate(Request request)
        {
            Request_In_Order requestInOrder = db.Request_In_Order.FirstOrDefault(r => r.requestID == request.requestID);

            return requestInOrder?.requestedDate;
        }
        private TimeSpan? GetRequestedHour(Request request)
        {
            Request_In_Order requestInOrder = db.Request_In_Order.FirstOrDefault(r => r.requestID == request.requestID);

            return requestInOrder?.requestedHour;
        }

    }
}
