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
    
    public partial class Employee
    {
        public string email { get; set; }
        public Nullable<System.DateTime> startingDate { get; set; }
        public bool isActive { get; set; }
        public string image { get; set; }
        public int hotelID { get; set; }
    
        public virtual User User { get; set; }
        public virtual Hotel Hotel { get; set; }
    }
}