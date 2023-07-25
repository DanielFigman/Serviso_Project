using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA.Exceptions
{
    internal class ObjectAlreadyExist : Exception
    {
        public ObjectAlreadyExist() : base("An object with the same primary key is already exist in the data base")
        {

        }
    }
}
