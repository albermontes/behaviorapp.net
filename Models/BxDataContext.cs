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
        public DbSet<MyDetailInfo> DetailInfos { get; set; }
        public DbSet<MyActivity> Activities { get; set; }
        public DbSet<MyIntervention> Interventions { get; set; }
        public DbSet<MyResponse> Responses { get; set; }
        public DbSet<MyReinforceResponse> ReinforceResponses { get; set; }
        public DbSet<Pair> Pairs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MyClient>().ToTable("Client");
            modelBuilder.Entity<MyNote>().ToTable("Note");
            modelBuilder.Entity<MyDetailInfo>().ToTable("DetailInfo");
            modelBuilder.Entity< MyActivity>().ToTable("Activity");
            modelBuilder.Entity<MyIntervention>().ToTable("Intervention");
            modelBuilder.Entity<MyResponse>().ToTable("Response");  
            modelBuilder.Entity<MyReinforceResponse>().ToTable("ReinforceResponse");
            modelBuilder.Entity<Pair>().ToTable("Pair");

            modelBuilder.Entity<MyNote>()
                .HasOne(n => n.detailInfo)
                .WithOne()
                .HasForeignKey<MyDetailInfo>(d => d.NoteForeignKey);
            modelBuilder.Entity<MyNote>()
                .HasMany(n => n.activities)
                .WithOne();
            modelBuilder.Entity<MyActivity>()
                .HasOne(a => a.response)
                .WithOne()
                .HasForeignKey<MyResponse>(r => r.ActivityForeignKey);
            modelBuilder.Entity<MyActivity>()
                .HasMany(n => n.interventions)
                .WithOne();
            modelBuilder.Entity<MyIntervention>()
                .HasOne(i => i.response)
                .WithOne()
                .HasForeignKey<MyResponse>(r => r.InterventionForeignKey);
            modelBuilder.Entity<MyIntervention>()
                .HasMany(i => i.description)
                .WithOne();
            modelBuilder.Entity<MyIntervention>()
                .HasMany(i => i.behavior)
                .WithOne();
            modelBuilder.Entity<MyResponse>()
                .HasMany(r => r.reinforceBefore)
                .WithOne();
            modelBuilder.Entity<MyResponse>()
                .HasMany(r => r.replacement)
                .WithOne();
            modelBuilder.Entity<MyResponse>()
                .HasMany(r => r.reinforceAfter)
                .WithOne();
            modelBuilder.Entity<MyResponse>()
                .HasOne(r => r.reinforceResponse)
                .WithOne()
                .HasForeignKey<MyReinforceResponse>(rr => rr.ResponseForeignKey);
        }
    }
}
