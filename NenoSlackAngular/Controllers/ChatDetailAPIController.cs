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
    //[Route("api/[controller]")]
    [ApiController]
    public class ChatDetailAPIController : ControllerBase
    {
        private readonly BloggingContext _context;

        public object OnlineUser { get; private set; }

        public ChatDetailAPIController(BloggingContext context)
        {
            _context = context;
        }

        // GET: api/ChatDetailAPI
        [Route("api/[controller]")]
        [HttpGet]
        public IEnumerable<ChatDetail> GetChatDetail()
        {
            return _context.ChatDetail;
        }
        //[Route("api/[controller]/GetOnlineUser/{userid}")]
        [Route("api/[controller]/GetUserChat/{receiverid}")]
        [HttpGet]
        public List<vwChatDetail> GetUserChat(int receiverid)
        {
            int userid = 0;
            if (HttpContext.Session.GetString("UseDetail") != null)
            {
                OnlineUser onlineUser = JsonConvert.DeserializeObject<OnlineUser>(HttpContext.Session.GetString("UseDetail"));
                userid = onlineUser.UserId;
            }

            var dtl = (from c in _context.ChatDetail
                       join u in _context.UserDetail
                       on c.FromUserId equals u.UserId
                       join r in _context.UserDetail
                       on c.ToUserId equals r.UserId
                       where (c.FromUserId == userid && c.ToUserId == receiverid) || (c.FromUserId == receiverid && c.ToUserId == userid)
                       orderby c.CreatedOn
                       select new vwChatDetail
                       {
                           chatId = c.ChatId,
                           createdOn = c.CreatedOn,//.ToString("dd/MM HH:mm"),
                           csscls = userid == c.FromUserId ? "sent" : "replies",
                           fromUserId = c.FromUserId,
                           IsRead = c.IsRead,
                           message = c.Message,
                           toUserId = c.ToUserId,
                           img = c.FromUserId == userid ? u.Img : r.Img
                       }).ToList();
            return dtl;
            // return _context.ChatDetail.Where(u => (u.FromUserId == userid && u.ToUserId == receiverid) || (u.FromUserId == receiverid && u.ToUserId == userid)).OrderBy(o => o.CreatedOn).ToList().Select(s => new vwChatDetail { chatId = s.ChatId, createdOn = s.CreatedOn.ToString("dd/MM HH:mm"), csscls = userid == s.FromUserId ? "sent" : "replies", fromUserId = s.FromUserId, IsRead = s.IsRead, message = s.Message, toUserId = s.ToUserId }).ToList<vwChatDetail>();
        }

        // GET: api/ChatDetailAPI/5
        [Route("api/[controller]/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetChatDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chatDetail = await _context.ChatDetail.FindAsync(id);

            if (chatDetail == null)
            {
                return NotFound();
            }

            return Ok(chatDetail);
        }

        // PUT: api/ChatDetailAPI/5
        [Route("api/[controller]")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChatDetail([FromRoute] int id, [FromBody] ChatDetail chatDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chatDetail.ChatId)
            {
                return BadRequest();
            }

            _context.Entry(chatDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatDetailExists(id))
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

        // POST: api/ChatDetailAPI
        [Route("api/[controller]")]
        [HttpPost]
        public async Task<IActionResult> PostChatDetail([FromBody] ChatDetail chatDetail)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.ChatDetail.Add(chatDetail);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetChatDetail", new { id = chatDetail.ChatId }, chatDetail);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // DELETE: api/ChatDetailAPI/5
        [Route("api/[controller]")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChatDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chatDetail = await _context.ChatDetail.FindAsync(id);
            if (chatDetail == null)
            {
                return NotFound();
            }

            _context.ChatDetail.Remove(chatDetail);
            await _context.SaveChangesAsync();

            return Ok(chatDetail);
        }

        [Route("api/[controller]")]
        private bool ChatDetailExists(int id)
        {
            return _context.ChatDetail.Any(e => e.ChatId == id);
        }
    }
}