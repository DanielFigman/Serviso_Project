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
    
    public partial class Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Order()
        {
            this.Activity_Update = new HashSet<Activity_Update>();
            this.Chats = new HashSet<Chat>();
            this.Request_In_Order = new HashSet<Request_In_Order>();
            this.Receipts = new HashSet<Receipt>();
            this.Activity_nearBY = new HashSet<Activity_nearBY>();
            this.Rooms = new HashSet<Room>();
        }
    
        public int orderID { get; set; }
        public Nullable<System.DateTime> checkInDate { get; set; }
        public Nullable<System.DateTime> checkOutDate { get; set; }
        public Nullable<int> adults { get; set; }
        public Nullable<int> children { get; set; }
        public Nullable<System.DateTime> orderDate { get; set; }
        public Nullable<System.TimeSpan> orderHour { get; set; }
        public string orderMethod { get; set; }
        public string email { get; set; }
        public Nullable<int> hotelID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Activity_Update> Activity_Update { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Chat> Chats { get; set; }
        public virtual Guest Guest { get; set; }
        public virtual Hotel Hotel { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Request_In_Order> Request_In_Order { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Receipt> Receipts { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Activity_nearBY> Activity_nearBY { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Room> Rooms { get; set; }
    }
}
