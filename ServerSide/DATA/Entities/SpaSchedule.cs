using Nest;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Migrations;
using System.Linq;

namespace DATA
{
    public partial class SpaSchedule
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public SpaSchedule()
        {

        }

        public SpaSchedule(int hotelID, string email)
        {
            DateTime? checkoutDate = db.Users.FirstOrDefault(obj => obj.email == email)?.GetCurrentOrder()?.checkOutDate.Date;

            DateTime today = DateTime.Now.Date;

            int numOfMaleTherapists = 2;
            int numOfFemaleTherapists = 2;

            // List to hold the new SpaSchedule objects
            List<SpaSchedule> newSchedules = new List<SpaSchedule>();


            int id = db.SpaSchedules.Count() + 1;

            while (db.SpaSchedules.FirstOrDefault(obj => obj.ScheduleID == id) != null)
            {
                id++;
            }

            // Loop through each date from today until the user's checkout date (included)
            for (DateTime date = today; date <= checkoutDate; date = date.AddDays(1))
            {
                // Check if there are rows in the SpaSchedule table for the current date and hotel
                bool hasRowsForDate = db.SpaSchedules.Any(s => s.Date == date && s.HotelID == hotelID);

                // If there are no rows for the current date, create the skeleton rows
                if (!hasRowsForDate)
                {
                    id = 1;
                    // Assuming your desired start and end times are 10:00 and 19:00
                    TimeSpan startTime = new TimeSpan(10, 0, 0);
                    TimeSpan endTime = new TimeSpan(19, 0, 0);

                    // Create the skeleton rows with available queue count equal to the number of therapists
                    for (TimeSpan time = startTime; time < endTime; time = time.Add(TimeSpan.FromMinutes(15)))
                    {
                        // Add the new SpaSchedule object to the list
                        newSchedules.Add(new SpaSchedule
                        {
                            ScheduleID = id++,
                            Date = date,
                            HotelID = hotelID,
                            StartTime = time,
                            EndTime = time.Add(TimeSpan.FromMinutes(45)), // Assuming each therapy is 45 minutes
                            AvailableMaleTherapist = numOfMaleTherapists,
                            AvailableFemaleTherapist = numOfFemaleTherapists
                        });;
                    }
                }
            }

            // Add all the new SpaSchedule objects to the database at once
            db.SpaSchedules.AddRange(newSchedules);
            db.SaveChanges();
        }
    }
}
