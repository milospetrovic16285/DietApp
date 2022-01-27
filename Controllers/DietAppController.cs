using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace DietApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DietAppController : ControllerBase
    {
        public DietAppContext Context {get;set;}
        public DietAppController(DietAppContext context)
        {
            Context = context;
        }

        [Route("Preuzmi")]
        [HttpGet]
        public  ActionResult Preuzmi()
        {
            return Ok();
        }

        [Route("PreuzmiTipove")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiTipove()
        {
            try
            {
                var tipovi =  Context.Namernice.Select(p => p.Type).Distinct();
                return Ok(tipovi);
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
        [Route("PreuzmiNamernice/{tip}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiNamernice(string tip)
        {
            try
            {
                if(tip==null)
                {
                    return BadRequest("Error tip");
                }

                var namernice =  await Context.Namernice.Where(p=>p.Type==tip).Select(s=>s.Name).ToListAsync();
                return Ok(namernice);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviKorisnika/{pass}")]
        [HttpPost]
        public async Task<ActionResult> NapraviKorisnika([FromBody] Korisnik korisnik,string pass)
        {
            try
            {   
                if(korisnik.Password != pass)
                    {
                        return BadRequest("Potvrdite ispravno sifru");
                    }
                
                var proveraKorisnik =  Context.Korisnici.Where(p => p.Username == korisnik.Username).FirstOrDefault();

                if (proveraKorisnik != null)
                    {
                    return BadRequest($"Korisnik sa korisnickim imenom {korisnik.Username} vec postoji.");
                    }
                
                if (korisnik.Height == 0 || korisnik.Weight == 0 || korisnik.Waist == 0 || korisnik.Neck==0 || korisnik.Age==0 )
                {
                    return BadRequest("Unesite pravilno podatke");
                }
                double uMetre=(double)korisnik.Height/100;
                double bmi = (double)korisnik.Weight/Math.Pow(uMetre,2);  
                korisnik.Bmi=bmi;

                double bodyfat;
                if (korisnik.Sex=="m")
                {
                    bodyfat=((double)495/(1.0324 - (0.19077 * Math.Log10(korisnik.Waist-korisnik.Neck)) + (0.15456 * Math.Log10(korisnik.Height)) ))-450;
                    korisnik.BodyFat=bodyfat;
                }
                else if (korisnik.Sex=="z")
                {
                    bodyfat=((double)495/(1.29579 - (0.35004*Math.Log10(korisnik.Waist-korisnik.Neck+korisnik.Hip)) + (0.22100*Math.Log10(korisnik.Height)) ))-450;
                    korisnik.BodyFat=bodyfat;
                }

                int kalorije=0;
                //sedentaran 1.2
                //blago aktivan  1.375
                //umereno aktivan 1.55
                //vrlo aktivan 1.725
                //ekstra aktrivan 1.9
                if (korisnik.Sex=="m")
                {
                    kalorije=(int)((10*korisnik.Weight)+6.25*korisnik.Height-(5*korisnik.Age)+5);
                    
                }
                else if (korisnik.Sex=="z")
                {
                    kalorije=(int)((10*korisnik.Weight)+6.25*korisnik.Height-(5*korisnik.Age)-161);
                    
                }

                switch (korisnik.Activity)
                {
                    case "sedentaran": 
                        kalorije=(int)(kalorije * 1.2);
                        break;

                    case "blago aktivan": 
                        kalorije=(int)(kalorije * 1.375);
                        break;

                    case "umereno aktivan": 
                        kalorije=(int)(kalorije * 1.55);
                        break;

                    case "vrlo aktivan": 
                        kalorije=(int)(kalorije * 1.725);
                        break;

                    case "ekstra aktivan": 
                        kalorije=(int)(kalorije * 1.9);
                        break;
                    default:
                        break;
                }

                korisnik.Calories=kalorije;

                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno napravljen nalog za {korisnik.Username}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PrijaviSe/{username}/{lozinka}")]
        [HttpPost]
        public async Task<ActionResult> PrijaviSe(string username,string lozinka)
        {
            try
            {
                var korisnik = Context.Korisnici.Where(p => p.Username == username).FirstOrDefault();
                if(korisnik==null)
                {
                    return BadRequest("Korisnik ne postoji" );
                }
                else if(korisnik.Password==lozinka)
                {
                    return Ok(korisnik.ID);
                }
                else
                {
                    return BadRequest("Pogresili ste sfiru" );
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratKorisnika/{id}")]
        [HttpGet]
        public async Task<ActionResult> VratiKorisnika(int id)
        {
            try
            {
                var kor = await Context.Korisnici.FindAsync(id);
                if(kor==null)
                {
                    return BadRequest("Korisnik ne postoji");
                }
                var datPos = kor.poslednjiDatum;

                DateTime trenutno = DateTime.Now;

                var trenutniDan= trenutno.ToString("d");

                if (datPos!=trenutniDan)
                {
                    kor.CurrentCalories=0;
                    Context.Korisnici.Update(kor);
                    await Context.SaveChangesAsync();
                }

                var korisnik =   Context.Korisnici.Include(p=>p.foods).ThenInclude(p=>p.food).Where(p=>p.ID==id).FirstOrDefault();

                

                if (korisnik == null)
                {
                    return  BadRequest($"Nepostoji korisnik sa tim id {id}");
                }
                else
                {
                    return Ok(korisnik);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodajNamernicu/{idKorisnika}/{namer}/{kolicina}")]
        [HttpPost]
        public async Task<ActionResult> DodajNamernicu(int idKorisnika,string namer,int kolicina)
        {
            try
            {
                var namernica = Context.Namernice.Where(p => p.Name == namer).FirstOrDefault();
                
                if(namernica == null)
                    return BadRequest("Namernica ne postoji");
                
                var korisnikN = Context.Korisnici.Where(p => p.ID == idKorisnika).FirstOrDefault();

                if(korisnikN == null)
                    return BadRequest("Korisnik ne postoji");

                if(kolicina == 0)
                    return BadRequest("Korisnik ne postoji");
                

                var noveKalorije=namernica.kCal*kolicina/100;

                UnetaHrana obj = new UnetaHrana();
                obj.Amount=kolicina;
                obj.korisnik=korisnikN;
                obj.food=namernica;
                DateTime dat = DateTime.Now;
                obj.datum= dat.ToString("d");

                korisnikN.poslednjiDatum=dat.ToString("d");

                korisnikN.CurrentCalories=korisnikN.CurrentCalories+noveKalorije;

                Context.UneteHrane.Add(obj);
                await Context.SaveChangesAsync();


                return Ok(obj);
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }
    
        [Route("PromeniKorisnika")]
        [HttpPut]
        public async Task<ActionResult> PromeniKorisnika([FromBody] Korisnik korisnik)
        {
        try
        {
            
                double uMetre=(double)korisnik.Height/100;
                double bmi = (double)korisnik.Weight/Math.Pow(uMetre,2);  
                korisnik.Bmi=bmi;

                double bodyfat;
                if (korisnik.Sex=="m")
                {
                    bodyfat=((double)495/(1.0324 - (0.19077 * Math.Log10(korisnik.Waist-korisnik.Neck)) + (0.15456 * Math.Log10(korisnik.Height)) ))-450;
                    korisnik.BodyFat=bodyfat;
                }
                else if (korisnik.Sex=="z")
                {
                    bodyfat=((double)495/(1.29579 - (0.35004*Math.Log10(korisnik.Waist-korisnik.Neck+korisnik.Hip)) + (0.22100*Math.Log10(korisnik.Height)) ))-450;
                    korisnik.BodyFat=bodyfat;
                }

                int kalorije=0;
                //sedentaran 1.2
                //blago aktivan  1.375
                //umereno aktivan 1.55
                //vrlo aktivan 1.725
                //ekstra aktrivan 1.9
                if (korisnik.Sex=="m")
                {
                    kalorije=(int)((10*korisnik.Weight)+6.25*korisnik.Height-(5*korisnik.Age)+5);
                    
                }
                else if (korisnik.Sex=="z")
                {
                    kalorije=(int)((10*korisnik.Weight)+6.25*korisnik.Height-(5*korisnik.Age)-161);
                    
                }

                switch (korisnik.Activity)
                {
                    case "sedentaran": 
                        kalorije=(int)(kalorije * 1.2);
                        break;

                    case "blago aktivan": 
                        kalorije=(int)(kalorije * 1.375);
                        break;

                    case "umereno aktivan": 
                        kalorije=(int)(kalorije * 1.55);
                        break;

                    case "vrlo aktivan": 
                        kalorije=(int)(kalorije * 1.725);
                        break;

                    case "ekstra aktivan": 
                        kalorije=(int)(kalorije * 1.9);
                        break;
                    default:
                        break;
                }

                

                korisnik.Calories=kalorije;
                
                System.Diagnostics.Debug.WriteLine(value: korisnik.CurrentCalories);

                Context.Korisnici.Update(korisnik);

                await Context.SaveChangesAsync();

                return Ok($"Korisnik sa ID: {korisnik.ID} je uspešno izmenjen!");
        }
        catch (Exception e)
        {
            
           return BadRequest(e.Message);
        }
        
        }

        [Route("IzbrisatiKorisnika/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            try
            {
                var korisnik = await Context.Korisnici.FindAsync(id);
                if(korisnik==null)
                {
                    return BadRequest("ne postoji korisnik");
                }
                var username = korisnik.Username;
                Context.Korisnici.Remove(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Uspešno izbrisan korisnik sa username-om: {username}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiNamernicu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiNamernicu(int id)
        {
            try
            {
                var namernica = await Context.UneteHrane.FindAsync(id);
                if(namernica==null)
                {
                    return BadRequest("namernica ne postoji");
                }
                
                
                Context.UneteHrane.Remove(namernica);
                await Context.SaveChangesAsync();
                return Ok($"Uspešno izbrisan namernica");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    
    }
}
