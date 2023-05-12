using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class FoodDTO
    {

        public int ID { get; set; }
        public string name { get; set; }

        public string description { get; set; }
        public string possibleChanges { get; set; }
        public string allergies { get; set; }
        public decimal? price { get; set; }
        public string imageURL { get; set; }
        public string tags { get; set; }

        public void SetFoodDTO(Food_And_Drinks foodParent)
        {
            Food food = foodParent.Food;

            ID = foodParent.ID;
            name = foodParent.name;
            allergies = foodParent.allergicIngs;
            price = foodParent.price;
            imageURL = foodParent.imageURL;
            tags = foodParent.tags;
            description = food.description;
            possibleChanges = food.possibleChanges;
        }
    }
}
