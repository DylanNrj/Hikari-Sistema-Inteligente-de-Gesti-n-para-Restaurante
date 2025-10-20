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
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemService _orderItemService;

        public OrderItemsController(IOrderItemService orderItemService)
        {
            _orderItemService = orderItemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItemDto>>> GetOrderItems()
        {
            var orderItems = await _orderItemService.GetAllOrderItemsAsync();
            var orderItemDtos = orderItems.Select(oi => new OrderItemDto
            {
                Id = oi.Id,
                OrderId = oi.OrderId,
                ProductId = oi.ProductId,
                Quantity = oi.Quantity,
                Price = oi.Price
            }).ToList();
            return Ok(orderItemDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItemDto>> GetOrderItem(int id)
        {
            var orderItem = await _orderItemService.GetOrderItemByIdAsync(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            var orderItemDto = new OrderItemDto
            {
                Id = orderItem.Id,
                OrderId = orderItem.OrderId,
                ProductId = orderItem.ProductId,
                Quantity = orderItem.Quantity,
                Price = orderItem.Price
            };

            return Ok(orderItemDto);
        }

        [HttpPost]
        public async Task<ActionResult<OrderItemDto>> CreateOrderItem([FromBody] CreateOrderItemDto createOrderItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderItem = new OrderItem
            {
                OrderId = createOrderItemDto.OrderId,
                ProductId = createOrderItemDto.ProductId,
                Quantity = createOrderItemDto.Quantity,
                Price = createOrderItemDto.Price
            };

            var createdOrderItem = await _orderItemService.CreateOrderItemAsync(orderItem);
            var orderItemDto = new OrderItemDto
            {
                Id = createdOrderItem.Id,
                OrderId = createdOrderItem.OrderId,
                ProductId = createdOrderItem.ProductId,
                Quantity = createdOrderItem.Quantity,
                Price = createdOrderItem.Price
            };

            return CreatedAtAction(nameof(GetOrderItem), new { id = orderItemDto.Id }, orderItemDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderItem(int id, [FromBody] UpdateOrderItemDto updateOrderItemDto)
        {
            if (id != updateOrderItemDto.Id)
            {
                return BadRequest();
            }

            var orderItem = new OrderItem
            {
                Id = updateOrderItemDto.Id,
                OrderId = updateOrderItemDto.OrderId,
                ProductId = updateOrderItemDto.ProductId,
                Quantity = updateOrderItemDto.Quantity,
                Price = updateOrderItemDto.Price
            };

            await _orderItemService.UpdateOrderItemAsync(orderItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItem(int id)
        {
            await _orderItemService.DeleteOrderItemAsync(id);
            return NoContent();
        }
    }
}