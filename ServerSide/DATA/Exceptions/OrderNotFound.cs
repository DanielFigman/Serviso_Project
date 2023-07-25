using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class OrderNotFound : Exception
    {
        public OrderNotFound() : base("We have not found an order that matches the sign in criteria," +
            " please make sure you try to login not sooner than 1 week before the check-in and not later than 1 day after the checkout")
        {

        }
    }
}
