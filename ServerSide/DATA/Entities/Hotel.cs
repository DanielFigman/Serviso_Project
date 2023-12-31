﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Hotel
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public List<HouseCustomRequestDTO> GetHouseCustomReqeustDto()
        {

            int[] ordersID = db.Orders
                .Where(order => order.hotelID == hotelID)
                .Select(y => y.orderID)
                .Distinct()
                .ToArray();

            long[] requestsID = db.Request_In_Order
                .Where(request => ordersID
                .Contains(request.orderID) && request.Request.status == "open")
                .Select(y => y.requestID)
                .Distinct()
                .ToArray();


            List<HouseHold_Custom_Request> customRequests = db.HouseHold_Custom_Request.Where(x => requestsID.Contains(x.requestID) && !x.isMarked).ToList();

            List<HouseCustomRequestDTO> customRequestsDTO = new List<HouseCustomRequestDTO>();

            customRequests.ForEach(c =>
            {
                HouseCustomRequestDTO hcd = new HouseCustomRequestDTO();
                hcd.SetHouseCustomRequestDTO(c);
                customRequestsDTO.Add(hcd);
            });

            return customRequestsDTO;
        }
         
        public List<HouseholdCleaningRequestsDTO> GetHouseholdCleaningRequests()
        {
            int[] ordersID = db.Orders
              .Where(order => order.hotelID == hotelID)
              .Select(y => y.orderID)
              .Distinct()
              .ToArray();

            long[] requestsID = db.Request_In_Order
              .Where(request => ordersID
              .Contains(request.orderID) && request.Request.status == "open")
              .Select(y => y.requestID)
              .Distinct()
              .ToArray();

            List<HouseHold_Cleaning_Request> cleaningRequests = db.HouseHold_Cleaning_Request.Where(x => requestsID.Contains(x.requestID) && x.HouseHold_Request.Request.status == "open").ToList();

            List<HouseholdCleaningRequestsDTO> cleaningRequestsDTO = new List<HouseholdCleaningRequestsDTO>();

            cleaningRequests.ForEach(c =>
            {
                HouseholdCleaningRequestsDTO hcd = new HouseholdCleaningRequestsDTO();
                hcd.SetHouseholdCleaningRequestsDTO(c);
                cleaningRequestsDTO.Add(hcd);
            });

            return cleaningRequestsDTO;
        }

        public List<RoomServiceRequestsDTO> GetRoomServiceRequests()
        {
            int[] ordersID = db.Orders
               .Where(order => order.hotelID == hotelID)
               .Select(y => y.orderID)
               .Distinct()
               .ToArray();

            long[] requestsID = db.Request_In_Order
                .Where(request => ordersID
                .Contains(request.orderID) && request.Request.status == "open")
                .Select(y => y.requestID)
                .Distinct()
                .ToArray();

            List<Food_And_Drinks_Room_Service> foodAndDrinksRequests = db.Food_And_Drinks_Room_Service.Where(x => requestsID.Contains(x.requestID) && x.isMarked != true).ToList();
            List<Additional_Items_Room_Service> additionalItemsRequests = db.Additional_Items_Room_Service.Where(x => requestsID.Contains(x.requestID) && x.isMarked != true).ToList();

            List<RoomServiceRequestsDTO> retVal = new List<RoomServiceRequestsDTO>();

            foodAndDrinksRequests.ForEach(obj =>
            {
                RoomServiceRequestsDTO objToAdd = new RoomServiceRequestsDTO();
                objToAdd.SetRoomServiceRequestDTO(obj);
                retVal.Add(objToAdd);
            });

            additionalItemsRequests.ForEach(obj =>
            {
                RoomServiceRequestsDTO objToAdd = new RoomServiceRequestsDTO();
                objToAdd.SetRoomServiceRequestDTO(obj);
                retVal.Add(objToAdd);
            });

            return retVal;

        }

        public List<RoomServiceMenuTyps> GetRoomServiceMenuTypes()
        {
            List<RoomServiceMenuTyps> retVal = new List<RoomServiceMenuTyps>();

            List<Food_And_Drinks> foodAndDrinks = db.Food_And_Drinks.Where(obj => obj.hotelID == hotelID).ToList();

            foodAndDrinks.ForEach(obj =>
            {
                RoomServiceMenuTyps valToAdd = new RoomServiceMenuTyps();
                if (obj.Food != null)
                {
                    valToAdd.SetRoomServiceMenuTyps(obj.Food);
                }
                else if (obj.Drink != null)
                {
                    valToAdd.SetRoomServiceMenuTyps(obj.Drink);

                }
                else
                {
                    valToAdd.SetRoomServiceMenuTyps(obj.Alcohol);
                }

                retVal.Add(valToAdd);
            });

            List<Additional_Items> additionalItems = db.Additional_Items.Where(obj => obj.hotelID == hotelID).ToList();

            additionalItems.ForEach(obj =>
            {
                RoomServiceMenuTyps valToAdd = new RoomServiceMenuTyps();
                valToAdd.SetRoomServiceMenuTyps(obj);

                retVal.Add(valToAdd);
            });

            return retVal;
        }

        public List<SpaScheduleDTO> GetSpaScheduleDTO(string email)
        {
            // making the table rows if not added already 
            SpaSchedule spaSchedule = new SpaSchedule(hotelID, email);

            DateTime? checkoutDate = db.Users.FirstOrDefault(obj => obj.email == email)?.GetCurrentOrder()?.checkOutDate.Date;

            // Get the current time
            DateTime today = DateTime.Now.Date;
            TimeSpan currentTime = DateTime.Now.TimeOfDay;
            TimeSpan fifteenMinutesLater = currentTime.Add(TimeSpan.FromMinutes(15));


            List<SpaSchedule> spaSchedules = SpaSchedules
                .Where(obj => (obj.Date.Date == today && obj.StartTime >= fifteenMinutesLater || obj.Date.Date <= checkoutDate && obj.Date.Date > today) && (obj.AvailableMaleTherapist > 0 || obj.AvailableFemaleTherapist > 0))
                .ToList();

            List<SpaScheduleDTO> retVal = new List<SpaScheduleDTO>();

            spaSchedules.ForEach(obj =>
            {
                SpaScheduleDTO scheduleDTO = new SpaScheduleDTO();
                scheduleDTO.SetSpaScheduleDTO(obj);
                retVal.Add(scheduleDTO);
            });

            retVal = retVal.OrderBy(scheduleDTO => scheduleDTO.Date).ToList();

            return retVal;
        }

        public List<SpaOrdersDTO> GetHolesSpaOrders()
        {
            List<SpaAppointment> spaOrders = db.SpaAppointments.Where(obj => obj.hotelID == hotelID).ToList();
            List<SpaOrdersDTO> retVal = new List<SpaOrdersDTO>();
            spaOrders.ForEach(obj =>
            {
                SpaOrdersDTO objToAdd = new SpaOrdersDTO(obj);
                retVal.Add(objToAdd);
            });

            return retVal;
        }

    }
}
