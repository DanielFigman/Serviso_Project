using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    internal class MissingFieldException : Exception
    {
        public MissingFieldException(string message) : base(message)
        {

        }

        public MissingFieldException() : base("one of the required fields of the user has not been sent")
        {

        }
    }
}
