using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NenoSlackAngular.Models;
using Newtonsoft.Json;

namespace NenoSlackAngular.Controllers
{
    public class LoginController : Controller
    {

        const int SessionUserId = 0;
        private readonly BloggingContext _context;

        public LoginController(BloggingContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult checkUser([Bind("UserName,Password")] UserDetail userDetail)
        {
            if (ModelState.IsValid)
            {
                var user = _context.UserDetail.Where(s => s.UserName == userDetail.UserName && s.Password == userDetail.Password).ToList().FirstOrDefault();
                if (user != null)
                {
                    //SessionValue.onlineUsers.Add(new OnlineUser { UserId = user.UserId, connectionIds = new List<string>(), Img = user.Img });

                    OnlineUser ouser = new OnlineUser();
                    ouser.UserId = user.UserId;
                    ouser.UserName = user.UserName;
                    ouser.Img = user.Img;
                    ouser.connectionIds = new List<string>();
                    HttpContext.Session.SetString("UseDetail", JsonConvert.SerializeObject(ouser));
                    int UserId = user.UserId;
                    HttpContext.Session.SetInt32("UserId", UserId);
                    return Redirect("/chat");
                }
            }
            return RedirectToAction(nameof(Index));
        }
    }
}