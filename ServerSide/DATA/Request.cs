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
    
    public partial class Request
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Request()
        {
            this.Request_In_Order = new HashSet<Request_In_Order>();
            this.WorkingInShifts = new HashSet<WorkingInShift>();
        }
    
        public long requestID { get; set; }
        public Nullable<System.DateTime> requestDate { get; set; }
        public Nullable<System.TimeSpan> requestHour { get; set; }
        public string status { get; set; }
    
        public virtual Fault_Request Fault_Request { get; set; }
        public virtual HouseHold_Request HouseHold_Request { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Request_In_Order> Request_In_Order { get; set; }
        public virtual Room_Service_Order Room_Service_Order { get; set; }
        public virtual Spa_Order Spa_Order { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WorkingInShift> WorkingInShifts { get; set; }
    }
}