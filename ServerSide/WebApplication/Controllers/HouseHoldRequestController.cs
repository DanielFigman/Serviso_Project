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
        [HttpPost]
        [Route("api/houseHoldCustomRequest")]

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
    }
}
