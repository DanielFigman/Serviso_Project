using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    internal class NonActiveRoom : Exception
    {
        public NonActiveRoom(int roomNum) : base($"Room number: {roomNum} is not active")
        {

        }

        public NonActiveRoom() : base("The selected room is not active")
        {

        }
    }
}
