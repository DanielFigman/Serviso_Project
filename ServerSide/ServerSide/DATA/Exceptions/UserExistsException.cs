using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    internal class UserExistsException : Exception
    {
        public UserExistsException(string email) : base(email + " is already exist in the system")
        {

        }

        public UserExistsException() : base("The given email is already exist in the system")
        {

        }
    }
}
