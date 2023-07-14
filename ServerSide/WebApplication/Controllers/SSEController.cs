using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Web.Script.Serialization;
using System.Net.Http;
using System.Net;
using System.Linq;

namespace WebApplication.Controllers
{
    public class SSEController : ApiController
    {
        private static readonly Dictionary<string, ClientInfo> Clients = new Dictionary<string, ClientInfo>();
        private static readonly Dictionary<string, FailedClientData> FailedClients = new Dictionary<string, FailedClientData>();
        private static readonly object lockObject = new object();

        private static Timer pingTimer;
        private static Timer retryTimer;
        private static readonly TimeSpan RetryInterval = TimeSpan.FromSeconds(30);
        private const int MaxRetries = 3;
        private class ClientInfo
        {
            public string Email { get; set; }
            public StreamWriter StreamWriter { get; set; }
        }

        [HttpGet]
        [Route("api/SSE")]
        public HttpResponseMessage SSEEndpoint(HttpRequestMessage request)
        {
            string email = request.GetQueryNameValuePairs()
                         .FirstOrDefault(q => q.Key.ToLower() == "email")
                         .Value;

            var response = request.CreateResponse(HttpStatusCode.OK);
            response.Content = new PushStreamContent((stream, content, context) =>
            {
                var clientStreamWriter = new StreamWriter(stream);

                lock (lockObject)
                {
                    Clients[email] = new ClientInfo
                    {
                        Email = email,
                        StreamWriter = clientStreamWriter
                    };
                }

                var waitHandle = new AutoResetEvent(false);
                waitHandle.WaitOne();

                lock (lockObject)
                {
                    Clients.Remove(email);
                    clientStreamWriter.Dispose();
                }

                waitHandle.Dispose();
            }, "text/event-stream");

            return response;
        }


        public static void SendMessageToClient(string email, object eventData)
        {
            var serializer = new JavaScriptSerializer();
            var eventString = $"data: {serializer.Serialize(eventData)}\n\n";

            lock (lockObject)
            {
                if (Clients.TryGetValue(email, out var clientInfo))
                {
                    var clientStreamWriter = clientInfo.StreamWriter;
                    try
                    {
                        clientStreamWriter.Write(eventString);
                        clientStreamWriter.Flush();
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine($"Error sending message to client {email}: {e.Message}");
                        Clients.Remove(email);
                        clientStreamWriter.Dispose();

                        if (FailedClients.TryGetValue(email, out var failedClientData))
                        {
                            if (failedClientData.RetryCount < MaxRetries)
                            {
                                // Increment retry count and reschedule the retry
                                failedClientData.RetryCount++;
                                failedClientData.EventData = eventData;
                                return;
                            }
                            else
                            {
                                // Remove the failed client after reaching the maximum number of retries
                                FailedClients.Remove(email);
                                return;
                            }
                        }

                        FailedClients[email] = new FailedClientData
                        {
                            RetryCount = 1,
                            EventData = eventData
                        };
                    }
                }
            }
        }

        public static void SendMessageToAllClients(object eventData)
        {
            var serializer = new JavaScriptSerializer();
            var eventString = $"data: {serializer.Serialize(eventData)}\n\n";

            lock (lockObject)
            {
                var clientsToRemove = new List<string>();
                foreach (var clientInfo in Clients.Values)
                {
                    var email = clientInfo.Email;
                    var clientStreamWriter = clientInfo.StreamWriter;
                    try
                    {
                        clientStreamWriter.Write(eventString);
                        clientStreamWriter.Flush();
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine($"Error sending message to client {email}: {e.Message}");
                        clientsToRemove.Add(email);
                        clientStreamWriter.Dispose();

                        if (FailedClients.TryGetValue(email, out var failedClientData))
                        {
                            if (failedClientData.RetryCount < MaxRetries)
                            {
                                // Increment retry count and reschedule the retry
                                failedClientData.RetryCount++;
                                failedClientData.EventData = eventData;
                                continue;
                            }
                            else
                            {
                                // Remove the failed client after reaching the maximum number of retries
                                FailedClients.Remove(email);
                                continue;
                            }
                        }

                        FailedClients[email] = new FailedClientData
                        {
                            RetryCount = 1,
                            EventData = eventData
                        };
                    }
                }

                foreach (var email in clientsToRemove)
                {
                    Clients.Remove(email);
                }
            }
        }

        private static void SendPing(object state)
        {
            SendMessageToAllClients(new { ping = true });
        }

        private static void RetryFailedMessages(object state)
        {
            lock (lockObject)
            {
                var clientsToRemove = new List<string>();
                foreach (var failedClient in FailedClients)
                {
                    if (Clients.ContainsKey(failedClient.Key))
                    {
                        if (failedClient.Value.RetryCount < MaxRetries)
                        {
                            // Retry sending the message to the failed client
                            SendMessageToClient(failedClient.Key, failedClient.Value.EventData);
                            failedClient.Value.RetryCount++;
                        }
                        else
                        {
                            // Remove the failed client after reaching the maximum number of retries
                            clientsToRemove.Add(failedClient.Key);
                        }
                    }
                    else
                    {
                        // Remove failed clients that are no longer connected
                        clientsToRemove.Add(failedClient.Key);
                    }
                }

                foreach (var clientId in clientsToRemove)
                {
                    FailedClients.Remove(clientId);
                }
            }
        }

        public static void StartPingTimer()
        {
            if (pingTimer == null)
            {
                pingTimer = new Timer(SendPing, null, TimeSpan.FromSeconds(30), TimeSpan.FromSeconds(30));
            }
        }

        public static void StopPingTimer()
        {
            pingTimer?.Dispose();
            pingTimer = null;
        }

        public static void StartRetryTimer()
        {
            if (retryTimer == null)
            {
                retryTimer = new Timer(RetryFailedMessages, null, RetryInterval, RetryInterval);
            }
        }

        public static void StopRetryTimer()
        {
            retryTimer?.Dispose();
            retryTimer = null;
        }

        private class FailedClientData
        {
            public int RetryCount { get; set; }
            public object EventData { get; set; }
        }
    }
}
