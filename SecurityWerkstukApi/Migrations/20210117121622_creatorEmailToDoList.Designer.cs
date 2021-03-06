﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SecurityWerkstukApi.Context;

namespace SecurityWerkstukApi.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210117121622_creatorEmailToDoList")]
    partial class creatorEmailToDoList
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("SecurityWerkstukApi.Models.ToDoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ToDoListId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ToDoItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Shampoo",
                            ToDoListId = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "Fruit",
                            ToDoListId = 1
                        },
                        new
                        {
                            Id = 3,
                            Name = "Gras afrijden",
                            ToDoListId = 2
                        },
                        new
                        {
                            Id = 4,
                            Name = "Bomen snoeien",
                            ToDoListId = 2
                        });
                });

            modelBuilder.Entity("SecurityWerkstukApi.Models.ToDoList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("EmailCreator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ToDoLists");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Shopping list"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Garden To Do's"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
