using HikariCore.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DatabaseHealthCheckController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DatabaseHealthCheckController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("check")]
    public async Task<IActionResult> CheckDatabaseConnection()
    {
        try
        {
            if (await _context.Database.CanConnectAsync())
            {
                var tables = await GetDatabaseTables();
                return Ok(new { Message = "Conexión a la base de datos exitosa.", Tables = tables });
            }
            else
            {
                return StatusCode(500, "No se pudo conectar a la base de datos.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al conectar a la base de datos: {ex.Message}");
        }
    }

    private async Task<List<string>> GetDatabaseTables()
    {
        var tables = new List<string>();
        var connection = _context.Database.GetDbConnection();
        await connection.OpenAsync();

        var dbName = connection.Database;

        using (var command = connection.CreateCommand())
        {
            command.CommandText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @dbName AND TABLE_TYPE = 'BASE TABLE'";
            command.Parameters.Add(new MySqlParameter("@dbName", dbName));

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    tables.Add(reader.GetString(0));
                }
            }
        }

        return tables;
    }
}