using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using showering_app.Data;
using showering_app.DTO;
using showering_app.Models;
using showering_app.Services; // Import the User model

namespace showering_app.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService; // Create an instance of TokenService


        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                // Authenticate the user here (e.g., check username and password)
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == loginRequest.Username && u.PasswordHash == loginRequest.Password);

                if (user == null)
                {
                    return BadRequest(new { message = "Invalid username or password" });
                }

                // Create and return a JWT token for authentication
                // You'll need to implement JWT token generation logic here

                // For now, let's assume you have a TokenService that can generate a token
                string token = _tokenService.GenerateToken(user); // Call the non-static method on the instance

                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            try
            {
                // Check if the username is already taken
                if (await _context.Users.AnyAsync(u => u.Username == registerRequest.Username))
                {
                    return BadRequest(new { message = "Username is already taken" });
                }

                // Create a new user and add it to the database
                var newUser = new User
                {
                    Username = registerRequest.Username,
                    PasswordHash = registerRequest.Password, // Assuming PasswordHash is used for storing hashed passwords
                    PasswordSalt = "YourSaltValue", // Generate a unique salt for each user during registration
                    Email = registerRequest.Email,
                    // Add other user properties here
                };

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                // You can return a success message or a JWT token here if needed

                return Ok(new { message = "Registration successful" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }
    }
}
