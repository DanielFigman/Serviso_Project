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
    
    public partial class Request_In_Order
    {
        public int requestID { get; set; }
        public int orderID { get; set; }
        public System.DateTime requestedDate { get; set; }
        public System.TimeSpan requestedHour { get; set; }
        public decimal price { get; set; }
    
        public virtual Order Order { get; set; }
        public virtual Request Request { get; set; }
    }
}
