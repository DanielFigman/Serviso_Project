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

namespace WebApplication.Controllers
{
    public class SSEController : ApiController
    {
        private static readonly Dictionary<string, StreamWriter> Clients = new Dictionary<string, StreamWriter>();
        private static readonly object lockObject = new object();

        private static Timer pingTimer;

        [HttpGet]
        [Route("api/SSE")]
        public HttpResponseMessage SSEEndpoint(HttpRequestMessage request)
        {
            var response = request.CreateResponse(HttpStatusCode.OK);
            response.Content = new PushStreamContent((stream, content, context) =>
            {
                var clientId = Guid.NewGuid().ToString();
                var clientStreamWriter = new StreamWriter(stream);

                lock (lockObject)
                {
                    Clients.Add(clientId, clientStreamWriter);
                }

                var waitHandle = new AutoResetEvent(false);
                waitHandle.WaitOne();

                lock (lockObject)
                {
                    Clients.Remove(clientId);
                    clientStreamWriter.Dispose();
                }

                waitHandle.Dispose();
            }, "text/event-stream");

            return response;
        }

        public static void SendMessageToClient(string clientId, object eventData)
        {
            var serializer = new JavaScriptSerializer();
            var eventString = $"data: {serializer.Serialize(eventData)}\n\n";

            lock (lockObject)
            {
                if (Clients.TryGetValue(clientId, out var clientStreamWriter))
                {
                    try
                    {
                        clientStreamWriter.Write(eventString);
                        clientStreamWriter.Flush();
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine($"Error sending message to client {clientId}: {e.Message}");
                        Clients.Remove(clientId);
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
                foreach (var client in Clients)
                {
                    try
                    {
                        client.Value.Write(eventString);
                        client.Value.Flush();
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine($"Error sending message to client {client.Key}: {e.Message}");
                        clientsToRemove.Add(client.Key);
                        client.Value.Dispose();
                    }
                }

                foreach (var clientId in clientsToRemove)
                {
                    Clients.Remove(clientId);
                }
            }
        }

        private static void SendPing(object state)
        {
            SendMessageToAllClients(new { ping = true });
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
        public IHttpActionResult SendToClient(string clientId, object data)
        {
            SendMessageToClient(clientId, data);
            return Ok("Message sent to client");
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
    }
}
