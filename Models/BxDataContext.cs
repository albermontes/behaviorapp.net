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
        //public DbSet<MyDetailInfo> DetailInfos { get; set; }
        //public DbSet<MyActivity> Activities { get; set; }
        //public DbSet<MyIntervention> Interventions { get; set; }
        //public DbSet<MyResponse> Responses { get; set; }
        //public DbSet<MyReinforceResponse> ReinforceResponses { get; set; }
        //public DbSet<Pair> Pairs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MyClient>().ToTable("Client");
            modelBuilder.Entity<MyNote>().ToTable("Note");
            //modelBuilder.Entity<MyDetailInfo>().ToTable("DetailInfo");
            //modelBuilder.Entity<MyActivity>().ToTable("Activity");
            //modelBuilder.Entity<MyIntervention>().ToTable("Intervention");
            //modelBuilder.Entity<MyResponse>().ToTable("Response");  
            //modelBuilder.Entity<MyReinforceResponse>().ToTable("ReinforceResponse");
            //modelBuilder.Entity<Pair>().ToTable("Pair");

            //modelBuilder.Entity<MyIntervention>()
            //    .HasMany(i => i.description)
            //    .WithOne()
            //    .HasForeignKey(p => p.InterventionDescriptionId)
            //    .OnDelete(DeleteBehavior.Cascade);
            //modelBuilder.Entity<MyIntervention>()
            //    .HasMany(i => i.behavior)
            //    .WithOne()
            //    .HasForeignKey(p => p.InterventionBehaviorId)
            //    .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<MyResponse>()
            //    .HasMany(r => r.reinforceBefore)
            //    .WithOne()
            //    .HasForeignKey(p => p.ResponseReinforceBeforeId)
            //    .OnDelete(DeleteBehavior.Cascade);
            //modelBuilder.Entity<MyResponse>()
            //    .HasMany(r => r.replacement)
            //    .WithOne()
            //    .HasForeignKey(p => p.ResponseReplacementId)
            //    .OnDelete(DeleteBehavior.Cascade);
            //modelBuilder.Entity<MyResponse>()
            //    .HasMany(r => r.reinforceAfter)
            //    .WithOne()
            //    .HasForeignKey(p => p.ResponseReinforceAfterId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
