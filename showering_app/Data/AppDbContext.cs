using Microsoft.EntityFrameworkCore;
using showering_app.Models;

namespace showering_app.Data;

public class AppDbContext : DbContext
    
{
    public DbSet<User> Users { get; set; }
    public DbSet<ShowerReport> ShowerReports { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
}