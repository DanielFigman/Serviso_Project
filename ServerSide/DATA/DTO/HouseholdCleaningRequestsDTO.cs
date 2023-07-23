using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class HouseholdCleaningRequestsDTO
    {

        public long requestID { get; set; }
        public bool? toClear { get; set; }
        public DateTime? requestedDate { get; set; }

        public TimeSpan? requestedHour { get; set; }
        public int roomNumber { get; set; }

        public void SetHouseholdCleaningRequestsDTO(HouseHold_Cleaning_Request cleaningRequest)
        {
            Request requestParent = cleaningRequest.HouseHold_Request.Request;
            Request_In_Order requestInOrder = requestParent.Request_In_Order.FirstOrDefault(obj => obj.requestID == cleaningRequest.requestID);

            requestID = cleaningRequest.requestID;
            toClear = cleaningRequest.toClear;
            requestedDate = requestInOrder.requestedDate;
            requestedHour = requestInOrder.requestedHour;
            roomNumber = requestInOrder.Order.Rooms.FirstOrDefault().roomNum;
        }
    }
}
