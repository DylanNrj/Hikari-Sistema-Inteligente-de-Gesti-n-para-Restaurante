using System.Text.Json.Serialization;

namespace HikariCore.Models
{
    public class Table
    {
        public int Id { get; set; }
        public int Number { get; set; } 
        public int Capacity { get; set; } 
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TableStatus Status { get; set; } = TableStatus.Available; 
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TableStatus
    {
        Available,
        Occupied,
        Reserved
    }
}