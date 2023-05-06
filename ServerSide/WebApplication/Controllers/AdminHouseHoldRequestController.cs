﻿using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class AdminHouseHoldRequestController : ApiController
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();


        [HttpGet]
        [Route("api/GetHouseHoldCustomRequests")]

        public IHttpActionResult Get([FromUri] int hotelID)
        {
            try
            {
                Hotel hotel = db.Hotels.FirstOrDefault(h => h.hotelID == hotelID);

                if (hotel != null)
                {
                    List<HouseCustomRequestDTO> customRequests = hotel.GetHouseCustomReqeustDto();

                    return Content(HttpStatusCode.OK, customRequests);
                }

                return BadRequest();

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }



        [HttpPut]
        [Route("api/CloseOpenRequest")]

        public IHttpActionResult Put([FromUri] long requestID)
        {
            try
            {
                Request request = db.Requests.FirstOrDefault(r => r.requestID == requestID);
        
                if (request != null)
                {
                    request.CloseOpenRequest();

                    return Ok();
                }

                throw new NonExistingRequest(requestID);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }

        [HttpPost]
        [Route("api/AdminCreateHouseHoldRequest")]

        public IHttpActionResult Post([FromUri] int roomNum, [FromUri] int hotelID, [FromBody] JObject data)
        {
            try
            {
                Request r = new Request();
                r.CraeteNewRequestEntity(roomNum,hotelID, data);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message });
            }
        }
    }
}
