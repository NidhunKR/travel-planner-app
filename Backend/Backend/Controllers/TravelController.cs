using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlannerAPI.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace TravelPlannerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TravelController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TravelController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET SUGGESTIONS + SAVE TO DB
        [HttpPost("suggestions")]
        public async Task<IActionResult> GetSuggestions([FromBody] TravelRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var suggestions = new List<TravelHistory>();

            if (request.Warm && request.Beach)
            {
                suggestions.Add(new TravelHistory
                {
                    UserId = userId,
                    Destination = "Bali",
                    Description = "Warm beaches and relaxed vibe"
                });

                suggestions.Add(new TravelHistory
                {
                    UserId = userId,
                    Destination = "Maldives",
                    Description = "Luxury beach comfort"
                });
            }

            suggestions.Add(new TravelHistory
            {
                UserId = userId,
                Destination = "Thailand",
                Description = "Affordable and fun"
            });

            _context.TravelHistories.AddRange(suggestions);
            await _context.SaveChangesAsync();

            return Ok(suggestions);
        }

        // ✅ GET HISTORY
        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var history = await _context.TravelHistories
                .Where(h => h.UserId == userId)
                .ToListAsync();
            return Ok(history);
        }
    }
}