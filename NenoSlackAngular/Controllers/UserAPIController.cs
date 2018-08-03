using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NenoSlackAngular.Models;
using Newtonsoft.Json;

namespace NenoSlackAngular.Controllers
{
    
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        private readonly BloggingContext _context;

        public UserAPIController(BloggingContext context)
        {
            _context = context;
        }

        // GET: api/UserAPI
        [Route("api/[controller]")]
        [HttpGet]
        public IEnumerable<UserDetail> GetUserDetail()
        {
            return _context.UserDetail;
        }
        [Route("api/UserAPI/GetAllUser")]
        [HttpGet]
        public IEnumerable<OnlineUser> GetAllUser()
        {
            return _context.UserDetail.ToList().Select(s => new OnlineUser { UserId = s.UserId, UserName = s.UserName, Img = s.Img, connectionIds = new List<string>() });
        }
        [Route("api/UserAPI/GetLoginUser")]
        [HttpGet]
        public OnlineUser GetLoginUser()
        {
            if(HttpContext.Session.GetString("UseDetail") != null)
                return JsonConvert.DeserializeObject<OnlineUser>(HttpContext.Session.GetString("UseDetail"));
            return null;
            //return _context.UserDetail.ToList().Select(s => new OnlineUser { UserId = s.UserId, UserName = s.UserName, Img = s.Img, connectionIds = new List<string>() });
        }
        //[Route("api/UserAPI/{userid}/GetOnlineUser")]
        //[HttpGet]
        //public OnlineUser GetOnlineUser(int userid)
        //{
        //    return _context.UserDetail.Where(u => u.UserId == userid).ToList().Select(s => new OnlineUser { UserId = s.UserId, UserName = s.UserName, Img = s.Img, connectionIds = new List<string>() }).First();
        //}
        [Route("api/[controller]/GetOnlineUser/{userid}")]
        [HttpGet]
        public OnlineUser GetOnlineUser(int userid)
        {
            return _context.UserDetail.Where(u => u.UserId == userid).ToList().Select(s => new OnlineUser { UserId = s.UserId, UserName = s.UserName, Img = s.Img, connectionIds = new List<string>() }).First();
        }
        [Route("api/[controller]/{id}")]
        // GET: api/UserAPI/5
        [HttpGet]
        public async Task<IActionResult> GetUserDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDetail = await _context.UserDetail.FindAsync(id);
            if (userDetail == null)
            {
                return NotFound();
            }
            //OnlineUser user = new OnlineUser { UserId = userDetail.UserId, UserName = userDetail.UserName, Img = userDetail.Img, connectionIds = new List<string>() };

            return Ok(userDetail);
        }

        // PUT: api/UserAPI/5
        [Route("api/[controller]")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDetail([FromRoute] int id, [FromBody] UserDetail userDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userDetail.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserAPI
        [Route("api/[controller]")]
        [HttpPost]
        public async Task<IActionResult> PostUserDetail([FromBody] UserDetail userDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.UserDetail.Add(userDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserDetail", new { id = userDetail.UserId }, userDetail);
        }

        // DELETE: api/UserAPI/5
        [Route("api/[controller]")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDetail = await _context.UserDetail.FindAsync(id);
            if (userDetail == null)
            {
                return NotFound();
            }

            _context.UserDetail.Remove(userDetail);
            await _context.SaveChangesAsync();

            return Ok(userDetail);
        }
        [Route("api/[controller]")]
        private bool UserDetailExists(int id)
        {
            return _context.UserDetail.Any(e => e.UserId == id);
        }
    }
}