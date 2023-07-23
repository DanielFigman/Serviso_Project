using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    partial class Order
    {

        public HouseholdCleaningRequestsDTO GetRoomCleaningRequest()
        {
            DateTime tomorrow = DateTime.Now.AddDays(1).Date;
            HouseholdCleaningRequestsDTO householdCleaningRequestsDTO = new HouseholdCleaningRequestsDTO();

            Request_In_Order requestInOrder = Request_In_Order.FirstOrDefault(obj => obj.requestedDate?.Date == tomorrow);

            if (requestInOrder != null)
            {
                HouseHold_Cleaning_Request cleaningRequest = requestInOrder.Request.HouseHold_Request?.HouseHold_Cleaning_Request;

                if (cleaningRequest != null)
                {
                    householdCleaningRequestsDTO.SetHouseholdCleaningRequestsDTO(cleaningRequest);
                    return householdCleaningRequestsDTO;
                }
            }

            return null;
        }
    }
}
