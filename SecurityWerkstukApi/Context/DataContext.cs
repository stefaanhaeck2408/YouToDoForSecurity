using Microsoft.EntityFrameworkCore;
using SecurityWerkstukApi.Models;

namespace SecurityWerkstukApi.Context
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<ToDoList> ToDoLists { get; set; }
        public DbSet<ToDoItem> ToDoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<ToDoList>().HasData(
                new ToDoList() {Id = 1, Name = "Shopping list" },
                new ToDoList() {Id = 2, Name = "Garden To Do's" }
                );

            modelBuilder.Entity<ToDoItem>().HasData(
                new ToDoItem() { Id = 1, Name = "Shampoo", ToDoListId = 1 },
                new ToDoItem() { Id = 2, Name = "Fruit", ToDoListId = 1 },
                new ToDoItem() { Id = 3, Name = "Gras afrijden", ToDoListId = 2 },
                new ToDoItem() { Id = 4, Name = "Bomen snoeien", ToDoListId = 2 }
                );

        }


    }
}
