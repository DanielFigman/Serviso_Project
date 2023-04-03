using DATA;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    public class EmailController : ApiController
    {
        // GET: api/Email
        [HttpGet]
        [Route("api/emailVerification")]
        public IHttpActionResult Get([FromUri]string email)
        {

            try
            {
                hotelDatabaseContext db = new hotelDatabaseContext();

                User user = db.Users.FirstOrDefault(u => u.email == email);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception e)
            {

                return Content(HttpStatusCode.BadRequest, e.Message);
            }
        }

        // POST: api/Email
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Email/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Email/5
        public void Delete(int id)
        {
        }
    }
}
