using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Trip
    {
        [Key]
        public int Id { get; set; }

        public string Destination { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; }
    }
}
