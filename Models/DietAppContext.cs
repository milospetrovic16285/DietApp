using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class DietAppContext : DbContext 
    {
        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Namernica> Namernice { get; set; }

        public DbSet<UnetaHrana> UneteHrane { get; set; }

        public DietAppContext(DbContextOptions options) : base(options)
        {

        } 
    }
}