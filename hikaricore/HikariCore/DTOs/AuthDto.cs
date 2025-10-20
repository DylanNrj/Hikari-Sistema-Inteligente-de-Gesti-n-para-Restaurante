using HikariCore.Models;

namespace HikariCore.DTOs
{
    public class AuthDto
    {
        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }
        public string Token { get; set; }
    }

    public class RegisterDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public RoleType Role { get; set; }
    }

    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}
