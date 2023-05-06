using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DATA;

namespace WebApplication.Controllers
{
    public class HotelController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();


        [HttpGet]
        [Route("api/hotelDirections")]
        public IHttpActionResult Get([FromUri] string email)
        {
            try
            {
                User user = db.Users.FirstOrDefault(u => u.email == email);
                String hotelLocation = user.GetHotelLocation();

                if (hotelLocation != null)
                {
                    return Ok(hotelLocation);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }

        }
    }
}
