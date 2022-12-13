﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using behavior_app.Models;

namespace behavior_app.Migrations.BxData
{
    [DbContext(typeof(BxDataContext))]
    partial class BxDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("behavior_app.Models.MyClient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Comments")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Number")
                        .HasColumnType("integer");

                    b.Property<bool>("Verbal")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Client");
                });

            modelBuilder.Entity("behavior_app.Models.MyNote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("MyClientId")
                        .HasColumnType("integer");

                    b.Property<int>("clientId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("jsonNote")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MyClientId");

                    b.ToTable("Note");
                });

            modelBuilder.Entity("behavior_app.Models.MyNote", b =>
                {
                    b.HasOne("behavior_app.Models.MyClient", null)
                        .WithMany("Notes")
                        .HasForeignKey("MyClientId");
                });
#pragma warning restore 612, 618
        }
    }
}
