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
    public class FavsAndRatingController : ApiController
    {
        HelperFunctions helpers = new HelperFunctions();

        [HttpPut]
        [Route("api/favorite")]

        public IHttpActionResult Put([FromUri] int placeId, [FromUri] string email)
        {
            try
            {
                Activity_Update activityUpdate = new Activity_Update(placeId, email);
                activityUpdate.SetFavorite();

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }


        [HttpPost]
        [Route("api/rating")]

        public IHttpActionResult Post([FromUri] int placeId, [FromUri] string email, [FromUri] int rating)
        {
            try
            {
                Activity_Update activityUpdate = new Activity_Update(placeId, email);
                activityUpdate.SetRating(rating);

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
