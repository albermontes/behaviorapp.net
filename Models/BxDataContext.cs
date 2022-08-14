using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class BxDataContext : DbContext
    {
        public BxDataContext(DbContextOptions<BxDataContext> options)
            : base(options)
        {

        }

        public DbSet<MyClient> Clients { get; set; }
        public DbSet<MyNote> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MyClient>().ToTable("Client");
            modelBuilder.Entity<MyNote>().ToTable("Note");
        }
    }
}
