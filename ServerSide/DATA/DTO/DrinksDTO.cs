using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class DrinksDTO
    {
        public int ID { get; set; }
        public string name { get; set; }

        public string allergies { get; set; }
        public decimal? price { get; set; }
        public string imageURL { get; set; }
        public string tags { get; set; }
        public string type { get; set; }
        public string category { get; set; }

        public void SetDrinksDTO(Food_And_Drinks drinkParent)
        {
            Drink drink = drinkParent.Drink;

            ID = drinkParent.ID;
            name = drinkParent.name;
            allergies = drinkParent.allergicIngs;
            price = drinkParent.price;
            imageURL = drinkParent.imageURL;
            tags = drinkParent.tags;
            type = "Drink";
            category = drink.category;
        }

        public Dictionary<string, string> GetDrinkToTranslate()
        {
            Dictionary<string, string> retVal = new Dictionary<string, string>();
            retVal["name"] = name;
            retVal["allergies"] = allergies;
            retVal["tags"] = tags;
            return retVal;
        }
    }
}
