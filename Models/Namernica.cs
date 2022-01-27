
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Namernica")]
    public class Namernica
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int kCal { get; set; }

        [Required]
        public double Proteins { get; set; }

        [Required]
        public double Carbs { get; set; }

        [Required]
        public double Fats { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Micronutrient { get; set; }

        
    }
}