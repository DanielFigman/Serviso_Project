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
    
    public partial class ActivityMoreImage
    {
        public int ID { get; set; }
        public string Url { get; set; }
        public Nullable<int> placeID { get; set; }
    
        public virtual Activity Activity { get; set; }
    }
}
