using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Models
{
    public class DatingAppDbContext : DbContext
    {
        public DatingAppDbContext(DbContextOptions<DatingAppDbContext> options) : base(options){}
        public DbSet<Value> Values { get; set; }
    }
}