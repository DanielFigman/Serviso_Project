﻿using DATA;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class UserController : ApiController
    {
        private readonly hotelAppDBContext db = new hotelAppDBContext();


        [HttpGet]
        [Route("api/login")]

        public IHttpActionResult Get([FromBody] JObject data)
        {
            try
            {
                string userEmail = data["userEmail"].ToString();
                string givenUserPassword = data["givenUserPassword"].ToString();


                User user = db.Users.FirstOrDefault(u => u.email == userEmail);

                bool isUserFound = user != null;

                if (isUserFound)
                {

                    bool passwordVerification = user.CheckUsersPassword(givenUserPassword);

                    if (passwordVerification)
                    {
                        bool isEmployeeFound = user.Employee != null;

                        return isEmployeeFound ? Ok("EMPLOYEE") : Ok("GUEST");
                    }
                    else
                    {
                        return BadRequest("PASSWORD");
                    }

                }
                else
                    return BadRequest("NOT_FOUND");
            }
            catch (Exception e)
            {

                return Content(HttpStatusCode.BadRequest, e.Message);
            }
        }

        // GET: api/Email
        [HttpGet]
        [Route("api/emailVerification")]
        public IHttpActionResult Get([FromUri] string email)
        {

            try
            {
                User user = db.Users.FirstOrDefault(u => u.email == email);

                bool isUserFound = user != null;

                if (isUserFound)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception e)
            {

                return Content(HttpStatusCode.BadRequest, e.Message);
            }
        }



        [HttpPost]
        [Route("api/signUP")]

        public IHttpActionResult Post([FromBody] JObject data)
        {
            try
            {
                User u = new User();
                u.CreateUser(data);

                return Ok();
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, new { type = e.GetType().Name, message = e.Message});
            }
        }
    }
}
