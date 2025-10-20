using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HikariCore.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("table_id")]
        public int TableId { get; set; }

        [Required]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Column("status")]
        public OrderStatus Status { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("TableId")]
        public Table Table { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public List<OrderItem> OrderItems { get; set; }
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