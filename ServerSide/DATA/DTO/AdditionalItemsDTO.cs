using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class AdditionalItemsDTO
    {
        public int ID { get; set; }
        public string name { get; set; }
        public decimal? price { get; set; }
        public string imageURL { get; set; }
        public string tags { get; set; }
        public string description { get; set; }

        public void SetAdditionalItemsDTO(Additional_Items additional_Item)
        {
            ID = additional_Item.ID;
            name = additional_Item.name;
            price = additional_Item.price;
            imageURL = additional_Item.imageURL;
            tags = additional_Item.tags;
            description = additional_Item.description;
        }

    }
}
