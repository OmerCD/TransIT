using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Transit.Server.Database.Migrations
{
    /// <inheritdoc />
    public partial class UserRoleSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "CreatedAt", "IsDeleted", "Name", "NormalizedName", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Admin", "ADMIN", new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, null, new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "User", "USER", new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
