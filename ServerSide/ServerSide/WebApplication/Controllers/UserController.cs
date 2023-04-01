using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class UserController : ApiController
    {

        [HttpGet]
        [Route("api/login")]

        public IHttpActionResult Get([FromBody] JObject data)
        {
            try
            {
                string userEmail = data["userEmail"].ToString();
                string givenUserPassword = data["givenUserPassword"].ToString();

                hotelDatabaseContext db = new hotelDatabaseContext();

                User user = db.Users.FirstOrDefault(u => u.email == userEmail);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                  
                    bool passwordVerification = user.CheckUsersPassword(givenUserPassword);

                    if (passwordVerification)
                    {
                        bool isEmployeeFound = user.Employee != null;

                        return isEmployeeFound ? Ok("EMPLOYEE") : Ok("GUEST");
                    }
                    else
                    {
                        return BadRequest("PASSWORD");
                    }

                }
                else
                    return BadRequest("NOT_FOUND");
            }
            catch (Exception e)
            {

                return Content(HttpStatusCode.BadRequest, e.Message);
            }
        }



    /*    [HttpPost]
        [Route("api/signUP")]

        public IHttpActionResult Post([FromBody] JObject data)
        {
            try
            {
                string givenEmail = data["userEmail"].ToString();
                string givenUserPassword = data["givenUserPassword"].ToString();
                string givenLanguage = data["language"].ToString();
                DateTime birthDate = Convert.ToDateTime(data["birthDate"]);
                string givenPhoneNumber = data["phoneNumber"].ToString();

                hotelDatabaseContext db = new hotelDatabaseContext();

                User newUser = new User();
                bool userCreationSucceed = newUser.UpdateUserInfo(givenEmail, givenUserPassword, givenLanguage, birthDate);


            }
            catch (Exception e)
            {

                return Content(HttpStatusCode.BadRequest, e.Message);
            }
        }

*/



        // POST: api/User
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
