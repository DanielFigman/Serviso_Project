using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web.Helpers;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class UserController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();


        [HttpGet]
        [Route("api/emailVerification")]
        public async Task<IHttpActionResult> Get([FromUri] string email)
        {
            try
            {
                User user = db.Users.FirstOrDefault(u => u.email == email);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                    string code = await user.SendCodeToUser();
                    if (code != null)
                    {
                        return Ok(code);
                    }
                }
                else
                {
                    throw new NonExistingUser(email);
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPut]
        [Route("api/changeLanguage")]
        public async Task<IHttpActionResult> Put([FromUri] string email, [FromUri] string languageShortName)
        {
            try
            {
                User user = db.Users.FirstOrDefault(u => u.email == email);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                    user.SetUserLanguage(languageShortName);
                    LoginDTO loginDTO = user.GetLoginDTO();

                    AzureTranslatorApi azureTranslator = new AzureTranslatorApi();
                    await azureTranslator.TranslateLoginDTO(loginDTO);

                    return Content(HttpStatusCode.OK, loginDTO);
                }
                else
                {
                    throw new NonExistingUser(email);
                }
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPost]
        [Route("api/signUP")]

        public IHttpActionResult Post([FromBody] JObject data)
        {
            try
            {
                User u = new User();
                u.CreateUser(data);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPost]
        [Route("api/passwordReset")]

        public IHttpActionResult Put([FromBody] JObject data)
        {
            try
            {
                string email = data["email"].ToString();
                string password = data["password"].ToString();

                User user = db.Users.FirstOrDefault(u => u.email == email);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                    user.PasswordUpdate(password);
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
