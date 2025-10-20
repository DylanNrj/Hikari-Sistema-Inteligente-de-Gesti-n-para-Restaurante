using HikariCore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HikariCore.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<Order> CreateOrderAsync(Order order);
        Task<Order> UpdateOrderAsync(Order order);
        Task<Order> PatchOrderAsync(Order order);
        Task<bool> DeleteOrderAsync(int id);
    }
}
