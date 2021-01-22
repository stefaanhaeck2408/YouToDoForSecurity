using Microsoft.EntityFrameworkCore.Migrations;

namespace SecurityWerkstukApi.Migrations
{
    public partial class creatorEmailToDoList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailCreator",
                table: "ToDoLists",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailCreator",
                table: "ToDoLists");
        }
    }
}
