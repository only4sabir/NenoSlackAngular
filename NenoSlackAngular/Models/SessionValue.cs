using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NenoSlackAngular.Models
{
    public static class SessionValue
    {
        public static List<OnlineUser> onlineUsers = new List<OnlineUser>();
    }
    public static class OnlineUsers
    {
        public static int UserId { get; set; }
        public static string UserName { get; set; }
        public static List<string> connectionIds { get; set; }
        public static string Img { get; set; }
    }
    public class OnlineUser
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public List<string> connectionIds { get; set; }
        public string Img { get; set; }
    }
}
