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
    
    public partial class HouseHold_Cleaning_Request
    {
        public int requestID { get; set; }
        public Nullable<bool> toClear { get; set; }
        public Nullable<bool> anyTime { get; set; }
        public Nullable<System.DateTime> scheduleTime { get; set; }
    
        public virtual HouseHold_Request HouseHold_Request { get; set; }
    }
}
