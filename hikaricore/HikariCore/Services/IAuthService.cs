using HikariCore.DTOs;
using System.Threading.Tasks;

namespace HikariCore.Services
{
    public interface IAuthService
    {
        Task<AuthDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthDto> LoginAsync(LoginDto loginDto);
    }
}

