using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class NonExistingUser : Exception
    {

        public NonExistingUser(string email) : base(email + " is not exist in the system")
        {

        }

        public NonExistingUser() : base("The given email is not exist in the system")
        {

        }
    }
}
