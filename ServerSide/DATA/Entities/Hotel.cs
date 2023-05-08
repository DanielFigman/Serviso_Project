using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Hotel
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public List<HouseCustomRequestDTO> GetHouseCustomReqeustDto()
        {

            int[] ordersID = db.Orders
                .Where(order => order.hotelID == hotelID)
                .Select(y => y.orderID)
                .Distinct()
                .ToArray();

            long[] requestsID = db.Request_In_Order
                .Where(request => ordersID
                .Contains(request.orderID) && request.Request.status == "open")
                .Select(y => y.requestID)
                .Distinct()
                .ToArray();


            List<HouseHold_Custom_Request> customRequests = db.HouseHold_Custom_Request.Where(x => requestsID.Contains(x.requestID) && !x.isMarked).ToList();

            List<HouseCustomRequestDTO> customRequestsDTO = new List<HouseCustomRequestDTO>();

            customRequests.ForEach(c =>
            {
                HouseCustomRequestDTO hcd = new HouseCustomRequestDTO();
                hcd.SetHouseCustomRequestDTO(c);
                customRequestsDTO.Add(hcd);
            });

            return customRequestsDTO;
        }
    }
}
