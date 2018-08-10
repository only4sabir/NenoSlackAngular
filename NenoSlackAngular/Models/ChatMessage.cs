using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NenoSlackAngular.Models
{
    public class ChatMessage
    {
        public string user { get; set; }

        public string message { get; set; }

        public string room { get; set; }
    }
    public class chatDetail
    {
        public int chatId { get; set; }
        public int fromUserId { get; set; }
        public int toUserId { get; set; }
        public DateTime createdOn { get; set; }
        public string message { get; set; }
        public string csscls { get; set; }
        public string IsRead { get; set; }
        public string img { get; set; }
    }
}
