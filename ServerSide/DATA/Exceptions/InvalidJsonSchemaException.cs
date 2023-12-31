﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    internal class InvalidJsonSchemaException : Exception
    {
        public InvalidJsonSchemaException() : base("The JSON schema is not matched with the creation object")
        {

        }

        public InvalidJsonSchemaException(string moreInfo) : base($"The JSON schema is not matched with the creation object, {moreInfo}")
        {

        }
    }
}
