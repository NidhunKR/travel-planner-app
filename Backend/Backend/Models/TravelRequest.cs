namespace TravelPlannerAPI.Models
{
    public class TravelRequest
    {
        public bool Warm { get; set; }
        public bool Beach { get; set; }
        public int Days { get; set; }
        public string ComfortLevel { get; set; }
    }
}
