using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HikariCore.DTOs
{
    public class UpdateOrderDto
    {
        public int Id { get; set; }
        [Required]
        public int TableId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus Status { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
    }

    public class OrderDto
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public int UserId { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateOrderDto
    {
        [Required]
        public int TableId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus Status { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus
    {
        Pending,
        InProgress,
        Completed,
        Cancelled
    }
}