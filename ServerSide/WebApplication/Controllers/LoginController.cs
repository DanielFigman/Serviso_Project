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
    public class LoginController : ApiController
    {
        private readonly hotelAppDBContext db = new hotelAppDBContext();


        [HttpPost]
        [Route("api/login")]

        public IHttpActionResult Post([FromBody] JObject data)
        {
            try
            {
                string userEmail = data["email"].ToString();
                string givenUserPassword = data["password"].ToString();


                User user = db.Users.FirstOrDefault(u => u.email == userEmail);

                bool isUserFound = user != null;

                if (isUserFound)
                {

                    bool passwordVerification = user.CheckUsersPassword(givenUserPassword);

                    if (passwordVerification)
                    {
                        bool isEmployeeFound = user.Employee != null;

                        if (isEmployeeFound)
                            return Content(HttpStatusCode.OK, new { userType = "EMPLOYEE" });
                        else
                        {
                            LoginDTO a = user.GetLoginDTO();
                            return Content(HttpStatusCode.OK, a);
                        }
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
