using HikariCore.DTOs;
using HikariCore.Models;
using HikariCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HikariCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            var orderDtos = orders.Select(order => new OrderDto
            {
                Id = order.Id,
                TableId = order.TableId,
                UserId = order.UserId,
                Status = (DTOs.OrderStatus)order.Status, 
                CreatedAt = order.CreatedAt,
                UpdatedAt = order.UpdatedAt
            }).ToList();

            return Ok(orderDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound(new { message = $"Order with ID {id} not found." });
            }

            var orderDto = new OrderDto
            {
                Id = order.Id,
                TableId = order.TableId,
                UserId = order.UserId,
                Status = (DTOs.OrderStatus)order.Status, 
                CreatedAt = order.CreatedAt,
                UpdatedAt = order.UpdatedAt
            };

            return Ok(orderDto);
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
        {
            var order = new Order
            {
                TableId = createOrderDto.TableId,
                UserId = createOrderDto.UserId,
                Status = (Models.OrderStatus)createOrderDto.Status, 
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var createdOrder = await _orderService.CreateOrderAsync(order);

            var orderDto = new OrderDto
            {
                Id = createdOrder.Id,
                TableId = createdOrder.TableId,
                UserId = createdOrder.UserId,
                Status = (DTOs.OrderStatus)createdOrder.Status, 
                CreatedAt = createdOrder.CreatedAt,
                UpdatedAt = createdOrder.UpdatedAt
            };

            return CreatedAtAction(nameof(GetOrder), new { id = orderDto.Id }, orderDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateOrderDto updateOrderDto)
        {
            if (id != updateOrderDto.Id)
            {
                return BadRequest(new { message = "ID in URL does not match ID in body." });
            }

            var order = new Order
            {
                Id = updateOrderDto.Id,
                TableId = updateOrderDto.TableId,
                UserId = updateOrderDto.UserId,
                Status = (Models.OrderStatus)updateOrderDto.Status, 
                UpdatedAt = updateOrderDto.UpdatedAt
            };

            var updatedOrder = await _orderService.UpdateOrderAsync(order);
            if (updatedOrder == null)
            {
                return NotFound(new { message = $"Order with ID {id} not found." });
            }

            return Ok(new { message = $"Order with ID {id} updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var deleted = await _orderService.DeleteOrderAsync(id);
            if (!deleted)
            {
                return NotFound(new { message = $"Order with ID {id} not found." });
            }

            return Ok(new { message = $"Order with ID {id} deleted successfully." });
        }
    }
}