using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class HouseHoldRequestController : ApiController
    {
        hotelAppDBContextNew db = new hotelAppDBContextNew();

        [HttpPost]
        [Route("api/newRequest")]

        public IHttpActionResult Post([FromBody] JObject data)
        {
            try
            {
                Request r = new Request();
                r.CraeteNewRequestEntity(data);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpGet]
        [Route("api/getCleaningRequest")]

        public IHttpActionResult Get([FromUri] string email)
        {
            try
            {
                HouseholdCleaningRequestsDTO retVal;
                User user = db.Users.FirstOrDefault(obj => obj.email == email);
                if (user != null)
                {
                    Order order = user.GetCurrentOrder();
                    retVal = order.GetRoomCleaningRequest();
                }
                else
                {
                    throw new NonExistingUser(email);
                }


                return Content(HttpStatusCode.OK, retVal);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
