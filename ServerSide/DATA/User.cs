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
    
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.Chats = new HashSet<Chat>();
            this.Questionnaires = new HashSet<Questionnaire>();
        }
    
        public string email { get; set; }
        public string fName { get; set; }
        public string sName { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public System.DateTime dateOfBirth { get; set; }
        public int languageID { get; set; }
        public byte[] SaltValue { get; set; }
        public byte[] PasswordValue { get; set; }
        public string NotificationToken { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Chat> Chats { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Guest Guest { get; set; }
        public virtual Language Language { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Questionnaire> Questionnaires { get; set; }
    }
}
