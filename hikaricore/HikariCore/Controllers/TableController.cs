using Microsoft.AspNetCore.Mvc;
using HikariCore.Models;
using HikariCore.Services;
using HikariCore.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace HikariCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TableController : ControllerBase
    {
        private readonly ITableService _tableService;

        public TableController(ITableService tableService)
        {
            _tableService = tableService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableDto>>> GetTables()
        {
            var tables = await _tableService.GetTablesAsync();
            var tableDtos = tables.Select(table => new TableDto
            {
                Id = table.Id,
                Number = table.Number,
                Capacity = table.Capacity,
                Status = table.Status
            }).ToList();

            return Ok(tableDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TableDto>> GetTable(int id)
        {
            var table = await _tableService.GetTableByIdAsync(id);
            if (table == null)
            {
                return NotFound(new { message = $"Table with ID {id} not found." });
            }

            var tableDto = new TableDto
            {
                Id = table.Id,
                Number = table.Number,
                Capacity = table.Capacity,
                Status = table.Status
            };

            return Ok(tableDto);
        }

        [HttpPost]
        public async Task<ActionResult<TableDto>> CreateTable([FromBody] CreateTableDto createTableDto)
        {
            var table = new Table
            {
                Number = createTableDto.Number,
                Capacity = createTableDto.Capacity,
                Status = createTableDto.Status
            };

            var createdTable = await _tableService.CreateTableAsync(table);

            var tableDto = new TableDto
            {
                Id = createdTable.Id,
                Number = createdTable.Number,
                Capacity = createdTable.Capacity,
                Status = createdTable.Status
            };

            return CreatedAtAction(nameof(GetTable), new { id = tableDto.Id }, tableDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTable(int id, [FromBody] UpdateTableDto updateTableDto)
        {
            if (id != updateTableDto.Id)
            {
                return BadRequest(new { message = "ID in URL does not match ID in body." });
            }

            var table = new Table
            {
                Id = updateTableDto.Id,
                Number = updateTableDto.Number,
                Capacity = updateTableDto.Capacity,
                Status = updateTableDto.Status
            };

            var updatedTable = await _tableService.UpdateTableAsync(table);
            if (updatedTable == null)
            {
                return NotFound(new { message = $"Table with ID {id} not found." });
            }

            return Ok(new { message = $"Table with ID {id} updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(int id)
        {
            var deleted = await _tableService.DeleteTableAsync(id);
            if (!deleted)
            {
                return NotFound(new { message = $"Table with ID {id} not found." });
            }

            return Ok(new { message = $"Table with ID {id} deleted successfully." });
        }
    }
}