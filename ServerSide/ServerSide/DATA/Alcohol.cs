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
    
    public partial class Alcohol
    {
        public int ID { get; set; }
        public Nullable<decimal> alcoholPercent { get; set; }
        public string tags { get; set; }
    
        public virtual Food_And_Drinks Food_And_Drinks { get; set; }
    }
}
