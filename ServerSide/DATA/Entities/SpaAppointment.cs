using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class SpaAppointment
    {
        private readonly HelperFunctions dataHelper = new HelperFunctions();
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();
        public SpaAppointment()
        {

        }

        public SpaAppointment(JObject obj)
        {
            Dictionary<string, object> convertedDict = dataHelper.ConvertJsonToDictionary(obj);
            SetNewID(convertedDict);

            SpaAppointment spaAppointment = dataHelper.CreateObjectFromDictionary<SpaAppointment>(convertedDict);
            if (spaAppointment.Therapy2Gender == "")
                spaAppointment.Therapy2Gender = null;

            if (spaAppointment.Therapy1Gender.ToLower() != "male" && spaAppointment.Therapy1Gender.ToLower() != "female")
                throw new InvalidJsonSchemaException("Therapist gender should be \"male\" or \"female\" only");
            if (spaAppointment.Therapy2Gender != null && spaAppointment.Therapy2Gender.ToLower() != "male" && spaAppointment.Therapy2Gender.ToLower() != "female")
                throw new InvalidJsonSchemaException("Therapist gender should be \"male\" or \"female\" or \"null\" only");

            dataHelper.SetObjectValuesFromObject(this, spaAppointment);

            db.SpaAppointments.AddOrUpdate(this);
            db.SaveChanges();

            HandleSpaScheduleChange(this);
        }

        private void SetNewID(Dictionary<string, object> convertedDict)
        {
            int id = db.SpaAppointments.ToList().Count + 1;

            while (db.SpaAppointments.FirstOrDefault(obj => obj.AppointmentID == id) != null)
            {
                id++;
            }

            convertedDict["AppointmentID"] = id;
        }

        private void HandleSpaScheduleChange(SpaAppointment appointment)
        {
            List<SpaSchedule> spaSchedules = db.SpaSchedules.Where(obj => obj.Date == appointment.Date && obj.StartTime >= appointment.StartTime &&
                obj.StartTime <= appointment.EndTime).ToList();

            string therapist1gender = appointment.Therapy1Gender.ToLower();
            string therapist2gender = appointment.Therapy2Gender?.ToLower();

            Dictionary<string, int> genderCounts = new Dictionary<string, int> { { "male", 0 }, { "female", 0 } };
            genderCounts[therapist1gender]++;
            if (therapist2gender != null)
                genderCounts[therapist2gender]++;

            spaSchedules.ForEach(obj =>
            {
                obj.AvailableMaleTherapist -= genderCounts["male"];
                obj.AvailableFemaleTherapist -= genderCounts["female"];

                db.SpaSchedules.AddOrUpdate(obj);
                db.SaveChanges();
            });
        }
    }
}
