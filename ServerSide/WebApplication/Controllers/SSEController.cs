using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace WebApplication.Controllers
{
    public class SSEController : ApiController
    {
        private static readonly Dictionary<string, ClientInfo> Clients = new Dictionary<string, ClientInfo>();
        private static readonly object lockObject = new object();

        private class ClientInfo
        {
            public string Email { get; set; }
            public StreamWriter StreamWriter { get; set; }
        }

        [HttpGet]
        [Route("api/SSE")]
        public HttpResponseMessage SSEEndpoint(HttpRequestMessage request, [FromUri] string email)
        {
            var response = request.CreateResponse(HttpStatusCode.OK);
            response.Content = new PushStreamContent((stream, content, context) =>
            {
                var clientStreamWriter = new StreamWriter(stream);

                lock (lockObject)
                {
                    Clients[email.ToLower()] = new ClientInfo
                    {
                        Email = email.ToLower(),
                        StreamWriter = clientStreamWriter
                    };
                }

                var waitHandle = new AutoResetEvent(false);
                waitHandle.WaitOne();

                lock (lockObject)
                {
                    Clients.Remove(email.ToLower());
                    clientStreamWriter.Dispose();
                }

                waitHandle.Dispose();
            }, "text/event-stream");

            return response;
        }


        public static void SendToClient(string email, string type, object eventData)
        {
            var serializer = new JavaScriptSerializer();
            var eventString = $"data: {serializer.Serialize(new object[] { type, eventData })}\n\n";

            lock (lockObject)
            {
                if (Clients.TryGetValue(email.ToLower(), out var clientInfo))
                {
                    var clientStreamWriter = clientInfo.StreamWriter;
                    bool messageSent = false;
                    int maxRetryCount = 3;
                    int retryDelaySeconds = 2;

                    for (int retry = 0; retry < maxRetryCount; retry++)
                    {
                        try
                        {
                            clientStreamWriter.Write(eventString);
                            clientStreamWriter.Flush();
                            messageSent = true;
                            break;
                        }
                        catch (Exception e)
                        {
                            Console.Error.WriteLine($"Error sending message to client {email}: {e.Message}");
                        }

                        Thread.Sleep(retryDelaySeconds * 1000);
                    }

                    if (!messageSent)
                    {
                        Console.Error.WriteLine($"Failed to send message to client {email} after {maxRetryCount} attempts.");
                        Clients.Remove(email.ToLower());
                        clientStreamWriter.Dispose();
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
                        clientsToRemove.Add(email.ToLower());
                        clientStreamWriter.Dispose();
                    }
                }

                foreach (var email in clientsToRemove)
                {
                    Clients.Remove(email.ToLower());
                }
            }
        }

        [HttpPost]
        [Route("api/SendToAllClients")]
        public IHttpActionResult SendMessageToAllClients()
        {
            var message = "Hello, all clients!";
            SendMessageToAllClients(message);
            return Ok("Message sent to all clients");
        }

        [HttpPost]
        [Route("api/SendToClient")]
        public IHttpActionResult SendMessageToClient(string email, string type, object data)
        {
            SendToClient(email.ToLower(), type, data);
            return Ok("Message sent to client");
        }

        public bool IsClientOnline(string email)
        {
            lock (lockObject)
            {
                return Clients.ContainsKey(email.ToLower());
            }
        }
    }
}
