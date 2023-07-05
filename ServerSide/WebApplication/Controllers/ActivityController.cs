using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class ActivityController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        [HttpPost]
        [Route("api/updateQuestionnaire")]
        public IHttpActionResult Post([FromBody] JObject questionnaire)
        {
            try
            {
                Questionnaire newQuestionnaire = new Questionnaire();
                newQuestionnaire.CreateQuestionnaire(questionnaire);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
