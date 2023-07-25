using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class RoomServiceMenuTyps
    {
        public int ID { get; set; }
        public string name { get; set; }
        public string type { get; set; }

        public decimal price { get; set; }

        public void SetRoomServiceMenuTyps(Food food)
        {
            ID = food.ID;
            name = food.Food_And_Drinks.name;
            type = "food";
            price = food.Food_And_Drinks.price ?? 0;
        }

        public void SetRoomServiceMenuTyps(Drink drink)
        {
            ID = drink.ID;
            name = drink.Food_And_Drinks.name;
            type = "Drink";
            price = drink.Food_And_Drinks.price ?? 0;
        }

        public void SetRoomServiceMenuTyps(Alcohol alcohol)
        {
            ID = alcohol.ID;
            name = alcohol.Food_And_Drinks.name;
            type = "Alcohol";
            price = alcohol.Food_And_Drinks.price ?? 0;

        }

        public void SetRoomServiceMenuTyps(Additional_Items additionalItem)
        {
            ID = additionalItem.ID;
            name = additionalItem.name;
            price = additionalItem.price ?? 0;
            type = "AdditionlItems";
        }
    }
}
