namespace Backend.Models
{
    public class TravelHistory
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public string Destination { get; set; }
        public string Description { get; set; }
    }
}
