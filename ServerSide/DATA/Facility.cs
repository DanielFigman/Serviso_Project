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
    
    public partial class Facility
    {
        public int facilityID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string contactNumber { get; set; }
        public string photo { get; set; }
        public Nullable<int> hotelID { get; set; }
    
        public virtual Hotel Hotel { get; set; }
    }
}
