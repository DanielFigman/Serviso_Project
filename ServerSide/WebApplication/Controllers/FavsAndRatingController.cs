using DATA;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class FavsAndRatingController : ApiController
    {
        HelperFunctions helpers = new HelperFunctions();

        [HttpPost]
        [Route("api/updateFavsAndRatings")]

        public IHttpActionResult Post([FromUri] string email, [FromBody] JObject[] activityUpdates)
        {
            try
            {
                activityUpdates.ForEach(obj =>
                {
                    Activity_Update activityUpdate = new Activity_Update((int)obj["placeID"], email);
                    activityUpdate.SetRatingAndFav((int?)obj["rating"], (bool?)obj["favorite"]);
                });

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }


        [HttpGet]
        [Route("api/getUpdatedActivities")]

        public IHttpActionResult Get([FromUri] string email)
        {
            try
            {
                List<ActivityUpdateDTO> retVal = helpers.GetActivitiesUpdate(email);

                return Content(HttpStatusCode.OK, retVal);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
