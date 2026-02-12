using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
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
        [HttpPost("suggestions")]
        public IActionResult GetSuggestions(TravelRequest request)
        {
            var trips = new List<Trip>
    {
        new Trip { Destination = "Bali", Description = "Warm beaches and relaxed vibe", UserId = 1 },
        new Trip { Destination = "Maldives", Description = "Luxury beach comfort", UserId = 1 },
        new Trip { Destination = "Thailand", Description = "Affordable and fun", UserId = 1 }
    };

            _context.Trips.AddRange(trips);
            _context.SaveChanges();

            return Ok(trips);
        }



        //[HttpPost("suggestions")]
        //public IActionResult GetSuggestions([FromBody] TravelRequest request)
        //{
        //    var suggestions = new List<object>();

        //    if (request.Warm && request.Beach)
        //    {
        //        suggestions.Add(new
        //        {
        //            destination = "Bali",
        //            description = "Warm weather, beaches, relaxed and comfortable"
        //        });

        //        suggestions.Add(new
        //        {
        //            destination = "Maldives",
        //            description = "Luxury beach destination with comfort"
        //        });
        //    }

        //    suggestions.Add(new
        //    {
        //        destination = "Thailand",
        //        description = "Affordable, warm and fun"
        //    });

        //    return Ok(suggestions);
        //}


    }
}
