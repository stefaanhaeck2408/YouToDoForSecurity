using Microsoft.EntityFrameworkCore.Migrations;

namespace SecurityWerkstukApi.Migrations
{
    public partial class seedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ToDoItems",
                columns: new[] { "Id", "Description", "Name", "ToDoListId" },
                values: new object[,]
                {
                    { 1, null, "Shampoo", 1 },
                    { 2, null, "Fruit", 1 },
                    { 3, null, "Gras afrijden", 2 },
                    { 4, null, "Bomen snoeien", 2 }
                });

            migrationBuilder.InsertData(
                table: "ToDoLists",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Shopping list" },
                    { 2, "Garden To Do's" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ToDoLists",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ToDoLists",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
