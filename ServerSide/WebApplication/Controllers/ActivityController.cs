using DATA;
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


        [HttpGet]
        [Route("api/getSuggestedActivities")]
        public IHttpActionResult Get([FromUri] string email)
        {
            try
            {

                SuggestedActivities suggestedActivities = GetSuggestedActivities(email);


                return Ok();

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }



        private SuggestedActivities GetSuggestedActivities(string email)
        {
            Questionnaire questionnaire = new Questionnaire();

            return questionnaire.GetSuggestedActivities(email);
        }
    }
}
