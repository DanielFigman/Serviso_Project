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
    public class FirebaseController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        [HttpPut]
        [Route("api/NTUPDATE")]
        public IHttpActionResult Put([FromBody] JObject data)
        {
            try
            {
                string email = data["email"].ToString();

                User user = db.Users.FirstOrDefault(u => u.email == email);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                    user.UpdateNToken(data);
                }
                else
                {
                    throw new NonExistingUser();
                }

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}