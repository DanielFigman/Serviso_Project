using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class AlcoholDTO
    {
        public int ID { get; set; }
        public string name { get; set; }

        public string allergies { get; set; }
        public decimal? price { get; set; }
        public string imageURL { get; set; }
        public string tags { get; set; }
        public string type { get; set; }
        public decimal? alcoholPercent { get; set; }
        public string category { get; set; }
        public bool? isDeleted { get; set; }
        public bool? inStock { get; set; }



        public void SetAlcoholDTO(Food_And_Drinks drinkParent)
        {
            Alcohol alcohol = drinkParent.Alcohol;

            ID = drinkParent.ID;
            name = drinkParent.name;
            allergies = drinkParent.allergicIngs;
            price = drinkParent.price;
            imageURL = drinkParent.imageURL;
            tags = drinkParent.tags;
            type = "Alcohol";
            alcoholPercent = alcohol.alcoholPercent;
            category = alcohol.category;
            isDeleted = drinkParent.isDeleted;
            inStock = drinkParent.inStock;
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
