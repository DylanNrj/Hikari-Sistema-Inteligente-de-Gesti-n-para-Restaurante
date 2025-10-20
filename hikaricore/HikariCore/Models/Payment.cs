using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HikariCore.Models
{
    public enum PaymentMethod
    {
        Cash,
        CreditCard,
        DebitCard
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed
    }

    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("order_id")]
        public int OrderId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Column("payment_method")]
        public PaymentMethod PaymentMethod { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Column("status")]
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        public Order Order { get; set; }
    }
}