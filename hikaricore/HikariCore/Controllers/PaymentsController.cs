using HikariCore.DTOs;
using HikariCore.Models;
using HikariCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HikariCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetPayments()
        {
            var payments = await _paymentService.GetAllPaymentsAsync();
            var paymentDtos = payments.Select(p => new PaymentDto
            {
                Id = p.Id,
                OrderId = p.OrderId,
                Amount = p.Amount,
                PaymentMethod = (DTOs.PaymentMethod)p.PaymentMethod,
                Status = (DTOs.PaymentStatus)p.Status,
                CreatedAt = p.CreatedAt
            }).ToList();
            return Ok(paymentDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDto>> GetPayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            var paymentDto = new PaymentDto
            {
                Id = payment.Id,
                OrderId = payment.OrderId,
                Amount = payment.Amount,
                PaymentMethod = (DTOs.PaymentMethod)payment.PaymentMethod,
                Status = (DTOs.PaymentStatus)payment.Status,
                CreatedAt = payment.CreatedAt
            };
            return Ok(paymentDto);
        }

        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePayment(CreatePaymentDto createPaymentDto)
        {
            var payment = new Payment
            {
                OrderId = createPaymentDto.OrderId,
                Amount = createPaymentDto.Amount,
                PaymentMethod = (Models.PaymentMethod)createPaymentDto.PaymentMethod,
                Status = Models.PaymentStatus.Pending, 
                CreatedAt = DateTime.UtcNow
            };
            var createdPayment = await _paymentService.CreatePaymentAsync(payment);
            var paymentDto = new PaymentDto
            {
                Id = createdPayment.Id,
                OrderId = createdPayment.OrderId,
                Amount = createdPayment.Amount,
                PaymentMethod = (DTOs.PaymentMethod)createdPayment.PaymentMethod,
                Status = (DTOs.PaymentStatus)createdPayment.Status,
                CreatedAt = createdPayment.CreatedAt
            };
            return CreatedAtAction(nameof(GetPayment), new { id = paymentDto.Id }, paymentDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, UpdatePaymentDto updatePaymentDto)
        {
            if (id != updatePaymentDto.Id)
            {
                return BadRequest();
            }

            var payment = new Payment
            {
                Id = updatePaymentDto.Id,
                OrderId = updatePaymentDto.OrderId,
                Amount = updatePaymentDto.Amount,
                PaymentMethod = (Models.PaymentMethod)updatePaymentDto.PaymentMethod,
                Status = (Models.PaymentStatus)updatePaymentDto.Status, 
                CreatedAt = DateTime.UtcNow
            };

            await _paymentService.UpdatePaymentAsync(payment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            await _paymentService.DeletePaymentAsync(id);
            return NoContent();
        }
    }
}