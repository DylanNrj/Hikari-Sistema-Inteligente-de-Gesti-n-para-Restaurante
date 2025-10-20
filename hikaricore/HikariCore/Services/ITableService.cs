using HikariCore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HikariCore.Services
{
    public interface ITableService
    {
        Task<IEnumerable<Table>> GetTablesAsync();
        Task<Table> GetTableByIdAsync(int id);
        Task<Table> CreateTableAsync(Table table);
        Task<Table> UpdateTableAsync(Table table);
        Task<Table> PatchTableAsync(Table table);
        Task<bool> DeleteTableAsync(int id);
    }
}