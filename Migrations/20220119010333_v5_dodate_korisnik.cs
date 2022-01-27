using Microsoft.EntityFrameworkCore.Migrations;

namespace DietApp.Migrations
{
    public partial class v5_dodate_korisnik : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UnetaHrana_Korisnik_KorisnikID",
                table: "UnetaHrana");

            migrationBuilder.RenameColumn(
                name: "KorisnikID",
                table: "UnetaHrana",
                newName: "korisnikID");

            migrationBuilder.RenameIndex(
                name: "IX_UnetaHrana_KorisnikID",
                table: "UnetaHrana",
                newName: "IX_UnetaHrana_korisnikID");

            migrationBuilder.AlterColumn<int>(
                name: "korisnikID",
                table: "UnetaHrana",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UnetaHrana_Korisnik_korisnikID",
                table: "UnetaHrana",
                column: "korisnikID",
                principalTable: "Korisnik",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UnetaHrana_Korisnik_korisnikID",
                table: "UnetaHrana");

            migrationBuilder.RenameColumn(
                name: "korisnikID",
                table: "UnetaHrana",
                newName: "KorisnikID");

            migrationBuilder.RenameIndex(
                name: "IX_UnetaHrana_korisnikID",
                table: "UnetaHrana",
                newName: "IX_UnetaHrana_KorisnikID");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "UnetaHrana",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_UnetaHrana_Korisnik_KorisnikID",
                table: "UnetaHrana",
                column: "KorisnikID",
                principalTable: "Korisnik",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
