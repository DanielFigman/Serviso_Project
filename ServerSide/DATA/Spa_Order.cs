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
    
    public partial class Spa_Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Spa_Order()
        {
            this.Spa_Order_Active = new HashSet<Spa_Order_Active>();
            this.Therapist_IN_Therapy = new HashSet<Therapist_IN_Therapy>();
            this.Health_Declaration = new HashSet<Health_Declaration>();
        }
    
        public int requestID { get; set; }
        public Nullable<int> numOfParticipants { get; set; }
        public string genderRequest { get; set; }
    
        public virtual Request Request { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Spa_Order_Active> Spa_Order_Active { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Therapist_IN_Therapy> Therapist_IN_Therapy { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Health_Declaration> Health_Declaration { get; set; }
    }
}
