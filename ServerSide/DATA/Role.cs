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
    
    public partial class Role
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Role()
        {
            this.WorkingInShifts = new HashSet<WorkingInShift>();
        }
    
        public int roleID { get; set; }
        public string name { get; set; }
        public Nullable<int> rank { get; set; }
        public Nullable<int> departmentID { get; set; }
    
        public virtual Department Department { get; set; }
        public virtual Therapist Therapist { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WorkingInShift> WorkingInShifts { get; set; }
    }
}
