using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models 
{
    [Table("UnetaHrana")]
    public class UnetaHrana
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int Amount { get; set; }

        [Required]
        public string datum {get;set;}

        [Required]
        public virtual Namernica food { get; set; }

        
        [JsonIgnore]
        [Required]
        public Korisnik korisnik {get; set; }
    }
}