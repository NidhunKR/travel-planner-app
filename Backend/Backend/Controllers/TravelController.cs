using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlannerAPI.Models;

namespace TravelPlannerAPI.Controllers
{
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
            var suggestions = new List<TravelHistory>();

            if (request.Warm && request.Beach)
            {
                suggestions.Add(new TravelHistory
                {
                    UserId = 1,
                    Destination = "Bali",
                    Description = "Warm beaches and relaxed vibe"
                });

                suggestions.Add(new TravelHistory
                {
                    UserId = 1,
                    Destination = "Maldives",
                    Description = "Luxury beach comfort"
                });
            }

            suggestions.Add(new TravelHistory
            {
                UserId = 1,
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
            var history = await _context.TravelHistories.ToListAsync();
            return Ok(history);
        }
    }
}
