using DATA;
using DATA.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class AdminHotelServicesController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        [HttpGet]
        [Route("api/GetHotelServices")]

        public IHttpActionResult Get([FromUri] int hotelID)
        {
            try
            {
                Hotel hotel = db.Hotels.FirstOrDefault(h => h.hotelID == hotelID);

                if (hotel != null)
                {
                    HotelServicesDTO hotelServices = new HotelServicesDTO(hotel);

                    return Content(HttpStatusCode.OK, hotelServices);
                }

                return BadRequest();

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
