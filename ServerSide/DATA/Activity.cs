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
    
    public partial class Activity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Activity()
        {
            this.Activity_Update = new HashSet<Activity_Update>();
            this.Category_rating = new HashSet<Category_rating>();
        }
    
        public int placeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Nullable<double> rating { get; set; }
    
        public virtual Activity_hotel Activity_hotel { get; set; }
        public virtual Activity_nearBY Activity_nearBY { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Activity_Update> Activity_Update { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Category_rating> Category_rating { get; set; }
    }
}
