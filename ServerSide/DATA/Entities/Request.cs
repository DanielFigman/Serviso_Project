using DATA.Exceptions;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
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
            Request request = dataHelper.CreateObjectFromDictionary<Request>(convertedDict);


            //checking if there isn't an existing object with the same primary key like the created instance in the data base 
            Request findObjectWithThisID = db.Requests.Where(r => r.requestID == request.requestID).FirstOrDefault();

            if (findObjectWithThisID != null)
            {
                throw new ObjectAlreadyExist();
            }

            //setting the instnce object values to this 
            dataHelper.SetObjectValuesFromObject(this, request);


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

        public void CloseOpenRequest()
        {
            status = "CLOSED";

            try
            {
                db.Requests.AddOrUpdate(this);
                db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
