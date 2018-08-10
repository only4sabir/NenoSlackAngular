using NenoSlackAngular.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NenoSlackAngular.Hubs
{
    public class DynamicChatHub : DynamicHub
    {
		public async Task SendMessage(ChatMessage message)
		{
			await Clients.All.Send(message);
		}
	}
}
