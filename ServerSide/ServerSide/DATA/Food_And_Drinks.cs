//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DATA
{
    using System;
    using System.Collections.Generic;
    
    public partial class Food_And_Drinks
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Food_And_Drinks()
        {
            this.Food_And_Drinks_Room_Service = new HashSet<Food_And_Drinks_Room_Service>();
        }
    
        public int ID { get; set; }
        public string name { get; set; }
        public string allergicIngs { get; set; }
        public Nullable<decimal> price { get; set; }
        public Nullable<bool> inStock { get; set; }
        public byte[] photo { get; set; }
    
        public virtual Alcohol Alcohol { get; set; }
        public virtual Drink Drink { get; set; }
        public virtual Food Food { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Food_And_Drinks_Room_Service> Food_And_Drinks_Room_Service { get; set; }
        public virtual Hot_Cold_Drinks Hot_Cold_Drinks { get; set; }
    }
}
