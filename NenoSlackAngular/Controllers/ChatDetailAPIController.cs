using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NenoSlackAngular.Models;

namespace NenoSlackAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatDetailAPIController : ControllerBase
    {
        private readonly BloggingContext _context;

        public ChatDetailAPIController(BloggingContext context)
        {
            _context = context;
        }

        // GET: api/ChatDetailAPI
        [HttpGet]
        public IEnumerable<ChatDetail> GetChatDetail()
        {
            return _context.ChatDetail;
        }

        // GET: api/ChatDetailAPI/5
        [HttpGet("{id}")]
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
            }catch(Exception)
            {
                return null;
            }
        }

        // DELETE: api/ChatDetailAPI/5
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

        private bool ChatDetailExists(int id)
        {
            return _context.ChatDetail.Any(e => e.ChatId == id);
        }
    }
}