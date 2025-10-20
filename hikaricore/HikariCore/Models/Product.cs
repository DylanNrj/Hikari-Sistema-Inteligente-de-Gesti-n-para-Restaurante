using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HikariCore.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string? ImageUrl { get; set; } 

        [Required]
        public bool IsActive { get; set; } 

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; } 

        public Category Category { get; set; } 
    }
}