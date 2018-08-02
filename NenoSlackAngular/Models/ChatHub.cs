using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NenoSlackAngular.Models
{
    public class ChatHub : Hub
    {
        //private static List<string> users = new List<string>();
        private static List<OnlineUser> users = new List<OnlineUser>();

        public Task SendMessageToCaller(string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", message);
        }

        public Task ConnectUser(int userId, string UserName, string ImgName)
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
            return null;
        }

        public Task SendMessageToGroups(string message)
        {
            List<string> groups = new List<string>() { "SignalR Users" };
            return Clients.Groups(groups).SendAsync("ReceiveMessage", message);
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

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
        public string getid()
        {
            var a = "";// Context.ConnectionId;
            return a.ToString();
        }
        public async Task SendMessage(string user, string message)
        {
            var senderId = Context.ConnectionId;
            await Clients.All.SendAsync("ReceiveMessage", user, message, senderId);
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
