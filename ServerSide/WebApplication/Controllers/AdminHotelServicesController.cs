using DATA;
using DATA.DTO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class AdminHotelServicesController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();
        private readonly HotelServicesHelper hotelServicesHelper = new HotelServicesHelper();
        private readonly SSEController sse;

        public AdminHotelServicesController()
        {
            sse = new SSEController(); // Create a new instance of SSEController
        }

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

        [HttpPost]
        [Route("api/AddOrUpdateService")]
        public IHttpActionResult Post([FromBody] JObject product, [FromUri] int hotelID)
        {
            try
            {
                hotelServicesHelper.UpdateService(product, hotelID);
                UpdateClient(hotelID);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPut]
        [Route("api/deleteService")]
        public IHttpActionResult Put([FromUri] string deletedType, int hotelID, int itemID)
        {
            try
            {
                hotelServicesHelper.DeleteService(deletedType, hotelID, itemID);
                UpdateClient(hotelID);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        private void UpdateClient(int hotelID)
        {
            List<User> users = db.Users.ToList();
            List<User> relevantUser = new List<User>();

            users.ForEach(obj =>
            {
                Order tempOrder = obj.GetCurrentOrder();
                if (tempOrder != null)
                {
                    if (tempOrder.hotelID == hotelID)
                    {
                        relevantUser.Add(obj);
                    }
                }
            });
            AzureTranslatorApi azureTranslator = new AzureTranslatorApi();

            relevantUser.ForEach(async obj =>
            {
                for (int i = 0; i < 2; i++)
                {
                    bool isClientOnline = sse.IsClientOnline(obj.email);
                    if (isClientOnline)
                    {
                        LoginDTO loginDTO = obj.GetLoginDTO();
                        await azureTranslator.TranslateLoginDTO(loginDTO);

                        _ = Task.Run(() =>
                        {
                            SSEController.SendToClient(obj.email, "LoginDTO", loginDTO);
                        });
                    }
                }
            });
        }
    }
}