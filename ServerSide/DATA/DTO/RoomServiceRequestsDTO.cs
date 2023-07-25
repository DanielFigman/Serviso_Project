using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class RoomServiceRequestsDTO
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public long requestID { get; set; }
        public Nullable<System.DateTime> requestDate { get; set; }
        public Nullable<System.TimeSpan> requestHour { get; set; }
        public int ID { get; set; }
        public int? amount { get; set; }
        public string changes { get; set; }
        public int? itemsCount { get; set; }
        public bool? isMarked { get; set; }
        public decimal price { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public int roomNumber { get; set; }

        public void SetRoomServiceRequestDTO(Food_And_Drinks_Room_Service foodAndDrinks)
        {
            Request requestParent = db.Requests.FirstOrDefault(obj => obj.requestID == foodAndDrinks.requestID);

            decimal price = 0; 

            if(foodAndDrinks.Food_And_Drinks.price != null)
            {
                price = Convert.ToDecimal(foodAndDrinks.Food_And_Drinks.price);
            }

            name = foodAndDrinks.Food_And_Drinks.name;
            ID = foodAndDrinks.ID;
            requestID = foodAndDrinks.requestID;
            requestDate = requestParent.requestDate;
            requestHour = requestParent.requestHour;
            amount = foodAndDrinks.amount;
            changes = foodAndDrinks.changes;
            itemsCount = foodAndDrinks.itemsCount;
            isMarked = foodAndDrinks.isMarked;
            this.price = (decimal)(amount * price);
            type = foodAndDrinks.Food_And_Drinks.Food != null ? "Food" : foodAndDrinks.Food_And_Drinks.Drink != null ? "Drink" : "Alcohol";
            roomNumber = GetRoomNumber(requestParent);
        }

        public void SetRoomServiceRequestDTO(Additional_Items_Room_Service addtionalItem)
        {
            Request requestParent = db.Requests.FirstOrDefault(obj => obj.requestID == addtionalItem.requestID);


            name = addtionalItem.Additional_Items.name;
            ID = addtionalItem.ID;
            requestID = addtionalItem.requestID;
            requestDate = requestParent.requestDate;
            requestHour = requestParent.requestHour;
            amount = addtionalItem.amount;
            changes = null;
            itemsCount = null;
            isMarked = addtionalItem.isMarked;
            type = "Additional_Items";
            price = (decimal)(amount * addtionalItem.Additional_Items.price);
            roomNumber = GetRoomNumber(requestParent);
        }

        private int GetRoomNumber(Request request)
        {
            Order o = request.Request_In_Order.FirstOrDefault().Order;

            int roomNumber = -1;

            if (o != null && o.Rooms.FirstOrDefault() != null)
            {
                roomNumber = o.Rooms.FirstOrDefault().roomNum;
            }

            return roomNumber;
        }
    }
}
