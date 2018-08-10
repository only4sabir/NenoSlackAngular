using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;

namespace NenoSlackAngular.Models
{
    public class ChatHub : Hub
    {
        private static List<OnlineUser> users = new List<OnlineUser>();
        public async Task SendMessage(ChatMessage message)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessage", message);
            }
            catch(Exception)
            { 
                await Clients.All.SendAsync("ReceiveMessage", message);
            }
        }

    }
    public class ChatHub1 : Hub
    {
        //private static List<string> users = new List<string>();
        private static List<OnlineUser> users = new List<OnlineUser>();

        static HttpClient client = new HttpClient();
        public Task SendMessageToCaller(string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", message);
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
            List<string> readConId = new List<string>();
            var us = users.Select(s => s.connectionIds).ToList();
            foreach (var c in us)
            {
                readConId.AddRange(c);
            }

            IReadOnlyList<string> lstConnectionId = (IReadOnlyList<string>)readConId;
            string lstOnlineUserId = String.Join("#liReceiverUserId", users.Where(u => u.connectionIds.Count > 0 && u.UserId > 0).Select(s => s.UserId));
            await Clients.Clients(lstConnectionId).SendAsync("ReceiveMessage", "", "", "", lstOnlineUserId);

            //return null;
        }

        public Task SendMessageToGroups(string message)
        {
            List<string> groups = new List<string>() { "SignalR Users" };
            return Clients.Groups(groups).SendAsync("ReceiveMessage", "", message, null);
        }
        public override async Task OnConnectedAsync()
        {
            //Int32 UserId = 0;// (Int32)_session.GetInt32("UserId");
            //users.Where(u=>u.UserId.Equals())
            //users.Where(s => s.UserId == UserId).First().connectionIds.Add("Sd");

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
        public string getid()
        {
            var a = "";// Context.ConnectionId;
            return a.ToString();
        }
        public async Task SendMessage(string UserId, string message, string ReceiverUserId)
        {
            var senderId = Context.ConnectionId;
            List<string> readConId = new List<string>();
            //IReadOnlyList<string> lstConnectionId = users.Where(s => s.UserId == Convert.ToInt16(UserId) || s.UserId == Convert.ToInt16(ReceiverUserId)).ToList().Select(s => String.Join(',', s.connectionIds)).ToList();
            var u = users.Where(s => s.UserId == Convert.ToInt16(UserId) || s.UserId == Convert.ToInt16(ReceiverUserId)).Select(s => s.connectionIds).ToList();
            foreach (var c in u)
            {
                readConId.AddRange(c);
            }
            ChatDetail objChat = new ChatDetail();
            objChat.FromUserId = Convert.ToInt16(UserId);
            objChat.ToUserId = Convert.ToInt16(ReceiverUserId);
            objChat.UserId = Convert.ToInt16(objChat.FromUserId);
            objChat.Message = message;
            objChat.CreatedOn = System.DateTime.Now;
            if (users.Where(s => s.UserId == objChat.ToUserId).ToList().Count > 0)
                objChat.IsRead = true;
            else
                objChat.IsRead = false;
            IReadOnlyList<string> lstConnectionId = (IReadOnlyList<string>)readConId; //;//.ToList<IReadOnlyList<string>>();
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
            //await Clients.All.SendAsync("ReceiveMessage", UserId, message, lstConnectionId);
            await Clients.Clients(lstConnectionId).SendAsync("ReceiveMessage", UserId, message, objChat.CreatedOn.ToString("dd/MM HH:mm"), null);

            //var o = Clients.Clients(lstConnectionId).SendAsync("ReceiveMessage", name, message, senderId);
            //await Clients.All.SendAsync("ReceiveMessage", UserId, message, lstConnectionId);
        }
        //public async Task SendMessage(string user, string message)
        //{
        //    var o = Clients.All.SendAsync("ReceiveMessage", user, message);
        //    await o;
        //}
        public async Task Send(string name, string message, string connId)
        {
            var senderId = Context.ConnectionId;
            IReadOnlyList<string> lst = new List<string>() { connId, senderId };// ("s,h,,hh,h,".Split(',').ToList());
            var o = Clients.Clients(lst).SendAsync("ReceiveMessage", name, message, senderId);
            //var context = ConnectionManager.GetHubContext<SampleHub>();
            //Context.Clients.All.online(_userCount);
            //Clients.Client()
            await o;
        }
    }

    //public class OnlineUser
    //{
    //    public int UserId { get; set; }
    //    public string UserName { get; set; }
    //    public List<string> connectionIds { get; set; }
    //    public string Img { get; set; }
    //}
    public class MyUserType
    {
        public string ConnectionId { get; set; }
        // Can have whatever you want here
    }
}
