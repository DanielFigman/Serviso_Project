using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Request
    {
        private readonly hotelAppDBContext db = new hotelAppDBContext();

        private readonly HelperFunctions dataHelper = new HelperFunctions();

        public bool CraeteNewRequestEntity(JObject data)
        {
            Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(data);
            Request r = dataHelper.CreateObjectFromDictionary<Request>(convertedDict);

            requestID = r.requestID;
            requestDate = r.requestDate;
            requestHour = r.requestHour;
            status = r.status;
            Fault_Request = r.Fault_Request;
            HouseHold_Request = r.HouseHold_Request;
            Request_In_Order = r.Request_In_Order;
            Room_Service_Order = r.Room_Service_Order;
            Spa_Order = r.Spa_Order;

            db.Requests.Add(this);
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw new MissingFieldException();
            }

            return true;
        }
    }
}
