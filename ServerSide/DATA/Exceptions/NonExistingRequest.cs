using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class NonExistingRequest : Exception
    {

        public NonExistingRequest(int id) : base($"Request ID: {id}, is not exist in the system")
        {

        }

        public NonExistingRequest() : base("The given Request is not exist in the system")
        {

        }
    }
}
