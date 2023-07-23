using DATA.DTO;
using DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Runtime.Remoting;
using Newtonsoft.Json.Linq;

namespace WebApplication.Controllers
{
    public class SpaController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        [HttpGet]
        [Route("api/GetSpaOrders")]
        public IHttpActionResult Get([FromUri] int hotelID)
        {
            try
            {
                Hotel hotel = db.Hotels.FirstOrDefault(obj => obj.hotelID == hotelID);
                if (hotel != null)
                {
                    List<SpaOrdersDTO> retVal = hotel.GetHolesSpaOrders();
                    return Content(HttpStatusCode.OK, retVal);
                }

                throw new Exception($"Hotel with ID: {hotelID} is not exist");
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpGet]
        [Route("api/GetSpaAvailable")]
        public IHttpActionResult GetSpaAvailable([FromUri] int hotelID, string email)
        {
            try
            {
                Hotel hotel = db.Hotels.FirstOrDefault(obj => obj.hotelID == hotelID);
                if(hotel != null)
                {
                    //get the available appointments
                    List<SpaScheduleDTO> retVal = hotel.GetSpaScheduleDTO(email);

                    return Content(HttpStatusCode.OK, retVal);
                }

                throw new Exception($"Hotel with ID: {hotelID} is not exist");
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPost]
        [Route("api/AppointSpaTreatment")]
        public IHttpActionResult Post([FromBody] JObject obj)
        {
            try
            {
                SpaAppointment spa = new SpaAppointment(obj);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

    }
}
