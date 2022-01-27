using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Models 
{
        [Table("Korisnik")]
    public class Korisnik 
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        
        [Required]
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$",ErrorMessage = "Unesite sifru sa minimum 8 karaktera , jednim slovom i jednim brojem.")]
        [MaxLength(50)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public string Sex { get; set; }

        [Required]
        [Range(1,100)]
        public int Age { get; set; }

        [Required]
        public int Weight { get; set; }


        [Required]
        public int Height { get; set; }

        [Required]
        public int Neck { get; set; }

        [Required]
        public int Waist { get; set; }

        [Required]
        public int Hip { get; set; }

        [Required]
        public string Activity { get; set; }

        public int CurrentCalories { get; set; }
        public int Calories { get; set; }

        public double Bmi { get; set; }

        public double BodyFat  { get; set; }

        public virtual List<UnetaHrana> foods{ get; set; }

        public string poslednjiDatum{get;set;}

        
    }
}