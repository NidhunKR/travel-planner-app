using Microsoft.AspNetCore.Mvc;

namespace TravelPlannerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TravelController : ControllerBase
    {
        [HttpGet("suggestions")]
        public IActionResult GetSuggestions()
        {
            var result = new
            {
                preferences = new
                {
                    weather = "Warm",
                    tripLength = "7 days",
                    style = "Comfort & Convenience"
                },
                destinations = new[]
                {
                    new
                    {
                        name = "Bali, Indonesia",
                        reason = "Warm beaches, relaxed vibe, great resorts",
                        flight = "Round trip – ₹45,000 (fake)",
                        hotel = "Beach Resort – ₹6,000/night",
                        activities = new[] { "Beach", "Spa", "Temple visits" }
                    },
                    new
                    {
                        name = "Phuket, Thailand",
                        reason = "Easy travel, beautiful beaches, good food",
                        flight = "Round trip – ₹40,000 (fake)",
                        hotel = "Sea View Hotel – ₹5,000/night",
                        activities = new[] { "Island hopping", "Snorkeling" }
                    }
                }
            };

            return Ok(result);
        }
    }
}
