using DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class ChatController : ApiController
    {
        [HttpGet]
        [Route("api/loggedInReceptionEmployee")]
        public async Task<IHttpActionResult> Get([FromUri] string hotelID)
        {
            try
            {
                Employee employee = new Employee();
                
                
                        return Ok();
               
                
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
