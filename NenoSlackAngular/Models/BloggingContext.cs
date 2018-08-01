using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using System.ComponentModel.DataAnnotations;

namespace NenoSlackAngular.Models
{

    public class BloggingContext : DbContext
    {
        public BloggingContext(DbContextOptions<BloggingContext> options)
            : base(options)
        { }

        public DbSet<UserDetail> UserDetail { get; set; }
        public DbSet<ChatDetail> ChatDetail { get; set; }
    }
    public class UserDetail
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Img { get; set; }

        public List<ChatDetail> ChatDetails { get; set; }
    }
    public class ChatDetail
    {
        [Key]
        public int ChatId { get; set; }
        public int FromUserId { get; set; }
        public int ToUserId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsRead { get; set; }

        public int UserId { get; set; }
        public UserDetail userDetails { get; set; }
    }
}
