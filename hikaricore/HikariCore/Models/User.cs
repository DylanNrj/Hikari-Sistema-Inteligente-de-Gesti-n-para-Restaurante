namespace HikariCore.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public RoleType Role { get; set; } = RoleType.User;
        public DateTime CreatedAt { get; set; }
    }

    public enum RoleType
    {
        Admin = 1,
        User = 2,
    }
}
