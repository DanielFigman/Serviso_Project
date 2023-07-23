using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class SpaScheduleDTO
    {

        public int ScheduleID { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public int? AvailableMale { get; set; }
        public int? AvailableFemale { get; set; }

        public void SetSpaScheduleDTO(SpaSchedule spaSchedule)
        {
            ScheduleID = spaSchedule.ScheduleID;
            Date = spaSchedule.Date;
            StartTime = spaSchedule.StartTime;

            AvailableMale = spaSchedule.AvailableMaleTherapist;
            AvailableFemale = spaSchedule.AvailableMaleTherapist;
        }
    }
}
