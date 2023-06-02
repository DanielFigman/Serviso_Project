using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DATA;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WebApplication
{
    public class ExpoPushNotification
    {
        public string to { get; set; }
        public string title { get; set; }
        public string body { get; set; }
        public Dictionary<string, string> data { get; set; }
    }

    public class PushNotifications
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        public async Task SendMessageToClientsAsync(List<string> clientEmails, JObject notification)
        {
            List<string> expoPushTokens = db.Users
                .Where(user => user.NotificationToken != null && clientEmails.Contains(user.email))
                .Select(user => user.NotificationToken)
                .ToList();

            string title = (string)notification["title"];
            string body = (string)notification["body"];
            Dictionary<string, string> data = notification["data"].ToObject<Dictionary<string, string>>();

            await SendExpoPushNotifications(expoPushTokens, title, body, data);
        }


        public async Task SendMessageToAllClientsAsync(JObject notification)
        {
            List<string> expoPushTokens = db.Users.Where(user => user.NotificationToken != null)
                .Select(user => user.NotificationToken)
                .ToList();

            string title = (string)notification["title"];
            string body = (string)notification["body"];
            Dictionary<string, string> data = notification["data"].ToObject<Dictionary<string, string>>();

            await SendExpoPushNotifications(expoPushTokens, title, body, data);
        }

        private async Task SendExpoPushNotifications(List<string> expoPushTokens, string title, string body, Dictionary<string, string> data)
        {
            using (var httpClient = new HttpClient())
            {
                var notifications = new List<ExpoPushNotification>();

                foreach (var token in expoPushTokens)
                {
                    notifications.Add(new ExpoPushNotification
                    {
                        to = token,
                        title = title,
                        body = body,
                        data = data
                    });
                }

                var json = JsonConvert.SerializeObject(notifications);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await httpClient.PostAsync("https://exp.host/--/api/v2/push/send", content);
                if (!response.IsSuccessStatusCode)
                {
                    // handle the error
                    Console.WriteLine($"Failed to send notifications. Response: {response}");
                }
            }
        }
    }
}
