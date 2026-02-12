using Backend.Data;
using Backend.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            // Check if email already exists
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("Email already exists");
            }

            // Lock the password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);

            if (existingUser == null)
            {
                return Unauthorized("Invalid email or password");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(
                user.PasswordHash,
                existingUser.PasswordHash
            );

            if (!isPasswordValid)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok("Login successful");
        }
    }
}
