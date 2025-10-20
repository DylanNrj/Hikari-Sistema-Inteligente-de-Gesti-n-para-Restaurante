using System.Text.Json.Serialization;
using HikariCore.Models;

namespace HikariCore.DTOs
{
    public class TableDto
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Capacity { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TableStatus Status { get; set; }
    }

    public class CreateTableDto
    {
        public int Number { get; set; }
        public int Capacity { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TableStatus Status { get; set; }
    }

    public class UpdateTableDto
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Capacity { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TableStatus Status { get; set; }
    }
}