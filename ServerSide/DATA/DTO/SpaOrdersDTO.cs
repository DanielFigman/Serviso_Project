using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class SpaOrdersDTO
    {
        public int AppointmentID { get; set; }
        public DateTime? Date { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public string Therapy1Gender { get; set; }
        public string Therapy2Gender { get; set; }
        public int? Room { get; set; }

        public SpaOrdersDTO()
        {

        }

        public SpaOrdersDTO(SpaAppointment spaAppointment)
        {
            AppointmentID = spaAppointment.AppointmentID;
            Date = spaAppointment.Date;
            StartTime = spaAppointment.StartTime;
            EndTime = spaAppointment.EndTime;
            Therapy1Gender = spaAppointment.Therapy1Gender;
            Therapy2Gender = spaAppointment.Therapy2Gender;
            Room = spaAppointment.User.GetCurrentOrder()?.Rooms.FirstOrDefault()?.roomNum;
        }
    }
}
