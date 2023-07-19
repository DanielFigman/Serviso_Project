using DATA;
using DATA.DTO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
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
        private readonly HelperFunctions dataHelper = new HelperFunctions();
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


        [HttpGet]
        [Route("api/GetFoodTypes")]

        public IHttpActionResult GetFoodTypes([FromUri] int hotelID)
        {
            try
            {
                Hotel hotel = db.Hotels.FirstOrDefault(h => h.hotelID == hotelID);

                if (hotel != null)
                {
                    List<RoomServiceMenuTyps> roomServiceMenuTypes = hotel.GetRoomServiceMenuTypes();

                    return Content(HttpStatusCode.OK, roomServiceMenuTypes);
                }

                return BadRequest();

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpGet]
        [Route("api/GetRoomServiceRequest")]

        public IHttpActionResult GetRoomServiceRequest([FromUri] int hotelID)
        {
            try
            {
                Hotel hotel = db.Hotels.FirstOrDefault(h => h.hotelID == hotelID);

                if (hotel != null)
                {
                    List<RoomServiceRequestsDTO> roomServiceMenuTypes = hotel.GetRoomServiceRequests();

                    return Content(HttpStatusCode.OK, roomServiceMenuTypes);
                }

                return BadRequest();

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPut]
        [Route("api/MarkRoomServiceRequest")]
        public IHttpActionResult MarkRoomServiceRequest([FromUri] int requestID, int? itemsCount)
        {
            try
            {
                bool isRequestClosed = false;
                if (itemsCount != null)
                {
                    Food_And_Drinks_Room_Service request = db.Food_And_Drinks_Room_Service.FirstOrDefault(obj => obj.requestID == requestID && obj.itemsCount == itemsCount);

                    if (request != null)
                    {
                        isRequestClosed = request.MarkRequest();
                    }
                    else
                    {
                        throw new NonExistingRequest(requestID);

                    }
                }
                else
                {
                    Additional_Items_Room_Service request = db.Additional_Items_Room_Service.FirstOrDefault(obj => obj.requestID == requestID);

                    if (request != null)
                    {
                        isRequestClosed = request.MarkRequest();
                    }
                    else
                    {
                        throw new NonExistingRequest(requestID);

                    }
                }

                if (isRequestClosed)
                {
                    PushNotifications p = new PushNotifications();

                    List<string> clients = dataHelper.GetClientByRequestId(requestID);

                    JObject notification = hotelServicesHelper.GetClosedRequestRoomServiceNotification(requestID);

                    _ = p.SendMessageToClientsAsync(clients, notification);
                }

                return Ok();
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