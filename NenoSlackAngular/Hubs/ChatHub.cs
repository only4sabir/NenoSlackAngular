using NenoSlackAngular.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;

namespace NenoSlackAngular.Hubs
{
    public class ChatHub : Hub
    {
        private static List<OnlineUser> users = new List<OnlineUser>();
        static HttpClient client = new HttpClient();
        public override async Task OnConnectedAsync()
        {
            OnlineUser user = new OnlineUser();
            user.connectionIds = new List<string>();
            user.connectionIds.Add(Context.ConnectionId);
            users.Add(user);

            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // users.Remove(Context.ConnectionId);
            foreach (var u in users)
            {
                u.connectionIds.Remove(Context.ConnectionId);
            }
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
        public async Task GetLoginUserId()
        {
            List<string> readConId = new List<string>();
            var us = users.Select(s => s.connectionIds).ToList();
            foreach (var c in us)
            {
                readConId.AddRange(c);
            }

            IReadOnlyList<string> lstConnectionId = (IReadOnlyList<string>)readConId;
            string lstOnlineUserId = String.Join(",", users.Where(u => u.connectionIds.Count > 0 && u.UserId > 0).Select(s => s.UserId));
            lstOnlineUserId = lstOnlineUserId + ",";
            await Clients.Clients(lstConnectionId).SendAsync("ReceiveMessageOnlineUser", lstOnlineUserId);
        }
        public async Task ConnectUser(int userId, string UserName, string ImgName)
        {
            if (users.Where(s => s.UserId == userId).ToList().Count > 0)
            {
                users.Where(s => s.UserId == userId).First().connectionIds.Add(Context.ConnectionId);
                var user = users.Where(s => s.UserId == 0 && s.connectionIds.Contains(Context.ConnectionId)).FirstOrDefault();
                if (user != null)
                    users.Remove(user);
            }
            else
            {
                var currentUser = users.Where(s => s.connectionIds.Contains(Context.ConnectionId)).First();
                currentUser.UserId = userId;
                currentUser.UserName = UserName;
                currentUser.Img = ImgName;
            }
            users.RemoveAll(s => s.UserId == 0 && s.connectionIds.Count == 0);
            List<string> readConId = new List<string>();
            var us = users.Select(s => s.connectionIds).ToList();
            foreach (var c in us)
            {
                readConId.AddRange(c);
            }

            IReadOnlyList<string> lstConnectionId = (IReadOnlyList<string>)readConId;
            string lstOnlineUserId = String.Join(",", users.Where(u => u.connectionIds.Count > 0 && u.UserId > 0).Select(s => s.UserId));
            lstOnlineUserId = lstOnlineUserId + ",";
            //string lstOnlineUserId = String.Join("#liReceiverUserId", users.Where(u => u.connectionIds.Count > 0 && u.UserId > 0).Select(s => s.UserId));
            //List<int> lstOnlineUserId = users.Where(u => u.connectionIds.Count > 0 && u.UserId > 0).Select(s => s.UserId).ToList();
            await Clients.Clients(lstConnectionId).SendAsync("ReceiveMessageOnlineUser", lstOnlineUserId);

            //return null;
        }
        public async Task SendMessage(chatDetail message)
        {
            var senderId = Context.ConnectionId;
            List<string> readConId = new List<string>();
            //IReadOnlyList<string> lstConnectionId = users.Where(s => s.UserId == Convert.ToInt16(UserId) || s.UserId == Convert.ToInt16(ReceiverUserId)).ToList().Select(s => String.Join(',', s.connectionIds)).ToList();
            var u = users.Where(s => s.UserId == Convert.ToInt16(message.fromUserId) || s.UserId == Convert.ToInt16(message.toUserId)).Select(s => s.connectionIds).ToList();
            foreach (var c in u)
            {
                readConId.AddRange(c);
            }
            ChatDetail objChat = new ChatDetail();
            objChat.FromUserId = message.fromUserId;// Convert.ToInt16(UserId);
            objChat.ToUserId = message.toUserId;// Convert.ToInt16(ReceiverUserId);
            objChat.UserId = message.fromUserId;// Convert.ToInt16(objChat.FromUserId);
            objChat.Message = message.message;
            objChat.CreatedOn = System.DateTime.Now;
            message.createdOn = System.DateTime.Now;
            if (users.Where(s => s.UserId == objChat.ToUserId).ToList().Count > 0)
                objChat.IsRead = true;
            else
                objChat.IsRead = false;
            IReadOnlyList<string> lstConnectionId = (IReadOnlyList<string>)readConId;
            try
            {
                //HttpResponseMessage response = await client.PostAsync<ChatDetail>("api/ChatDetailAPI",objChat);
                //response.EnsureSuccessStatusCode();

                var json = JsonConvert.SerializeObject(objChat);

                var stringContent = new StringContent(json, System.Text.UnicodeEncoding.UTF8, "application/json");

                //var client = new HttpClient();
                var response = await client.PostAsync("https://localhost:44314/api/ChatDetailAPI", stringContent);
            }
            catch
            { }
            //await Clients.Clients(lstConnectionId).SendAsync("ReceiveMessage", chat UserId, message, objChat.CreatedOn.ToString("dd/MM HH:mm"), null);

            await Clients.Clients(lstConnectionId).SendAsync("ReceiveMessage", message);

        }
        public async Task SendMessage1(ChatMessage message)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessage", message);
            }
            catch (Exception)
            {
                await Clients.All.SendAsync("ReceiveMessage", message);
            }
        }
    }
}
