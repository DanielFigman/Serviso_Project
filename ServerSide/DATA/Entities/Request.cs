using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DATA
{
    public partial class Request
    {
        private readonly hotelAppDBContext db = new hotelAppDBContext();

        private readonly HelperFunctions dataHelper = new HelperFunctions();

        public bool CraeteNewRequestEntity(JObject data)
        {
            //converting the Json to a dictionary
            Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(data);

            //creating an instance of Request based on the Json properties
            Request r = dataHelper.CreateObjectFromDictionary<Request>(convertedDict);

            //setting the instnce object values to this 
            dataHelper.SetObjectValuesFromObject(this, r);


            db.Requests.Add(this);
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw new MissingFieldException();
            }

            return true;
        }
    }
}
