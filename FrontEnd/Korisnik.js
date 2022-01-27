import { createEl,createInput } from "./helperFunkcije.js";
import { UnetaHrana } from "./UnetaHrana.js";

export class Korisnik 
{
    constructor(id,username,password,firstname,lastname,sex,age,weight,height,neck,waist,hip,activity,currentCalories,calories,bmi,bodyfat,posldenjiDatum)
    {
        this.id=id;
        this.username=username;
        this.password=password;
        this.firstname=firstname;
        this.lastname=lastname;
        this.sex=sex;
        this.age=age;
        this.weight=weight;
        this.height=height;
        this.neck=neck;
        this.waist=waist;
        this.hip=hip;
        this.activity=activity;
        this.currentCalories=currentCalories;
        this.calories=calories;
        this.bmi=bmi;
        this.bodyfat=bodyfat;
        this.posldenjiDatum=posldenjiDatum;

        this.foods=[];
        this.container=null;
    }
    drawAll(host)
    {
        if (!host)
            throw new Exception("Roditeljski element ne postoji");

        if(host)
        {
            host.innerHTML=" ";
        }
            let divWindow = createEl("divWindow","div","",host);

            this.container=divWindow;

            //Header
            let divHeader = createEl("divHeader","div","",divWindow);
            createEl("naslov","h1","Diet App🥗",divHeader);
            

            //Navbar
            let divNavbar=createEl("divNavbar","div","",divWindow);

            
            let promEl = createEl("promEl","a","Promenite podatke",divNavbar);
            promEl.onclick = ev => this.prom();


            let dodajEl = createEl("dodajEl","a","Dodaj namernicu",divNavbar);
            dodajEl.onclick = ev => this.dodaj();

            
            let loginEl = createEl("loginEl levo","a","Prijavite se",divNavbar);
            loginEl.onclick = ev => this.login();
            
            let signInEl=createEl("signInEl","a","Napravite nalog",divNavbar);
            signInEl.onclick= ev => this.signin();
            
            let obrisiEl = createEl("obrisiEl","a","Obrisi profil",divNavbar);
            obrisiEl.onclick = ev => this.obrisi();
            
            let welcomeEl = createEl("welcomeEl levo","a","",divNavbar);
            welcomeEl.onclick= ev => this.fetchProfile(this.id);
            let logoutEl = createEl("logoutEl ","a","Logout",divNavbar);
            logoutEl.onclick= ev => this.drawAll(document.body);
            
            dodajEl.style.display = "none";
            obrisiEl.style.display = "none";
            promEl.style.display = "none";
            logoutEl.style.display = "none";
            welcomeEl.style.display = "none";
           
            let divMain = createEl("divMain","div"," ",divWindow);

            let divInformation = createEl("divInformation","div","",divMain);
            

            let divForm = createEl("divForm","div","",divMain);
            createEl("","h2","Dobro dosli u AppDiet",divForm);
            
    }
    obrisi()
    {
        let divForm = this.container.querySelector(".divForm");
        console.log(divForm);
        divForm.innerHTML = " ";

        createEl("","h2","Obrisi korisnika",divForm);
        createEl("","h3","Potvrdi brisanje profila",divForm);
        let butt = createEl("","button","Potvdri",divForm);
        butt.onclick=ev=>{
            fetch("https://localhost:5001/DietApp/IzbrisatiKorisnika/" + this.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                    })
            })
            .then(e => {
                this.drawAll(document.body);
            })
        }
    }
    signin()
    {
        let divForm = this.container.querySelector(".divForm");
        let divInformation = this.container.querySelector(".divInformation");

       
        divForm.innerHTML = " ";
        
        divInformation.innerHTML = " ";


        createEl("","h2","Napravite nalog",divInformation);
        let forma = createEl("formCon","div","",divForm);

        let form = createEl("","div","",forma);

        let ul = createEl("flex-outer","ul","",form)

        let li1 = createEl("","li","",ul);
        createEl("","label","Username :", li1);
        createInput("","text","username","Unesite username",li1);

        let li2 = createEl("","li","",ul);
        createEl("","label","Password :", li2);
        createInput("","password","password","Unesite password",li2);

        let li3 = createEl("","li","",ul);
        createEl("","label","Potvrdite password :", li3);
        createInput("","password","password2","Potvrdite password",li3);

        let li4 = createEl("","li","",ul);
        createEl("","label","Ime :", li4);
        createInput("","text","ime","Unesite ime",li4);

        let li6 = createEl("","li","",ul);
        createEl("","label","Prezime :", li6);
        createInput("","text","prezime","Unesite prezime",li6);

        let li5 = createEl("","li","",ul);
        createEl("","p","Pol :",li5);
        let ul2 = createEl("flex-inner","ul","",li5);

        let li51 = createEl("","li","",ul2);
        var ch1 = createEl("","input","",li51);
        ch1.type="radio";
        ch1.value="m";
        ch1.name="pol";
        let lbl1 = createEl("","label","Muski",li51);
        

        let li52 = createEl("","li","",ul2);
        var ch2 = createEl("","input","",li52);
        ch2.type="radio";
        ch2.value="z";
        ch2.name="pol";
        let lbl2 = createEl("","label","Zenski",li52);
        

        let li7 = createEl("","li","",ul);
        createEl("","label","Godine :", li7);
        createInput("","number","godine","Unesite godine",li7);

        let li8 = createEl("","li","",ul);
        createEl("","label","Tezina :", li8);
        createInput("","number","tezina","Unesite tezinu u kg",li8);

        let li9 = createEl("","li","",ul);
        createEl("","label","Visina :", li9);
        createInput("","number","visina","Unesite visinu u cm",li9);

        let li10 = createEl("","li","",ul);
        createEl("","label","Struk :", li10);
        createInput("","number","struk","Unesite struk u cm",li10);

        let li101 = createEl("","li","",ul);
        createEl("","label","Vrat :", li101);
        createInput("","number","vrat","Unesite vrat u cm",li101);

        let li11 = createEl("","li","",ul);
        createEl("","p","Nivo aktivnosti :",li11);
        let ul22 = createEl("flex-inner","ul","",li11);

        let li522 = createEl("","li","",ul22);
        let ch3 = createInput("","radio","sedentaran","",li522);
        ch3.value="sedentaran";
        ch3.name="aktivnost"
        let lbl3 = createEl("","label","Sedentaran",li522);
        

        let li53 = createEl("","li","",ul22);
        let ch4 = createInput("","radio","blago aktivan","",li53);
        ch4.value="blago aktivan";
        ch4.name="aktivnost";
        let lbl4 = createEl("","label","Blago aktivan",li53);

        let li54 = createEl("","li","",ul22);
        let ch5 = createInput("","radio","umereno aktivan","",li54);
        ch5.value="umereno aktivan";
        ch5.name="aktivnost";
        let lbl5 = createEl("","label","Umerno aktivan",li54);

        let li55 = createEl("","li","",ul22);
        let ch6 = createInput("","radio","vrlo aktivan","",li55);
        ch6.value="vrlo aktivan";
        ch6.name="aktivnost";
        let lbl6 = createEl("","label","Vrlo aktivan",li55);

        let li56 = createEl("","li","",ul22);
        let ch7 = createInput("","radio","ekstra aktivan","",li56);
        ch7.value="ekstra aktivan";
        ch7.name="aktivnost";
        let lbl7 = createEl("","label","Ekstra aktivan",li56);

        let li44 = createEl("","li","",ul);
        let buttSignin = createEl("","button","Napravi nalog", li44);

        createEl("errorDiv","div","",form);
        createEl("sucDiv","div","",form);

        buttSignin.onclick = ev =>
        {
           let akt = this.container.querySelector('input[name="aktivnost"]:checked').value
            let poll = this.container.querySelector('input[name="pol"]:checked').value;
            console.log(poll);
            fetch("https://localhost:5001/DietApp/NapraviKorisnika/"+password2.value,
            {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(
                    {
                        Username:username.value,
                        FirstName:ime.value,
                        LastName:prezime.value,
                        Sex:poll,
                        Age:godine.value,
                        Weight:tezina.value,
                        Height:visina.value,
                        Neck: vrat.value,
                        Waist:struk.value,
                        Activity:akt,
                        Password:password.value
                    })
            })
            .then(res => {
                if(!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                   }
                  else {
                   return res.text();
                 } 
            })
            .then(data => {
                let sucDiv = this.container.querySelector(".sucDiv");
                    console.log(sucDiv);
                    if(sucDiv.innerHTML != " ")
                    {
                        sucDiv.innerHTML = " ";
                    }
                   createEl("sucP","p",data,sucDiv);
            })
            .catch(err =>
                {
                    let errorDiv = this.container.querySelector(".errorDiv");
                    console.log(errorDiv);
                    if(errorDiv.innerHTML != " ")
                    {
                        errorDiv.innerHTML = " ";
                    }
                   createEl("errorP","p",err,errorDiv);
                }
            );
        }


    }
    login()
    {
        let divForm = this.container.querySelector(".divForm");
        let divInformation = this.container.querySelector(".divInformation");

        
        divForm.innerHTML = " ";
        
        divInformation.innerHTML = " ";

        createEl("","h2","Prijavite se",divInformation);

        let forma = createEl("formCon","div","",divForm);

        let form = createEl("","div","",forma);

        let ul = createEl("flex-outer","ul","",form)

        let li1 = createEl("","li","",ul);
        createEl("","label","Username :", li1);
        createInput("","text","username","Unesite username",li1);

        let li2 = createEl("","li","",ul);
        createEl("","label","Password :", li2);
        createInput("","password","password","Unesite password",li2);

        let li3 = createEl("","li","",ul);
        let buttLogin = createEl("","button","Prijavite se", li3);

        createEl("errorDiv","div","",form);

        buttLogin.onclick = ev =>
        {
            
            fetch("https://localhost:5001/DietApp/PrijaviSe/"+ username.value +"/"+password.value,
            {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(
                    {
                    })
            })
            .then(res => {
                if(!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                   }
                  else {
                   return res.json();
                 } 
            })
            .then(data => {
                this.fetchProfile(data);
            })
            .catch(err =>
                {
                    let errorDiv = this.container.querySelector(".errorDiv");
                    console.log(errorDiv);
                    if(errorDiv.innerHTML != " ")
                    {
                        errorDiv.innerHTML = " ";
                    }
                   createEl("errorP","p",err,errorDiv);
                }
            );
            
        }
    }

    fetchProfile(id)
    {
        this.foods=[];
        
        fetch("https://localhost:5001/DietApp/VratKorisnika/"+ id)
            .then(res => {
                if(!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                   }
                  else {
                   return res.json();
                 } 
            })
            .then(data => {
                console.log(data);
                this.id=data.ID;
                this.password=data.Password;
                this.activity=data.Activity;
                this.age=data.Age;
                this.bmi=data.Bmi;
                this.bodyfat=data.BodyFat;
                this.calories=data.Calories;
                this.currentCalories=data.CurrentCalories;
                this.firstname=data.FirstName;
                this.height=data.Height;
                this.hip=data.Hip;
                this.lastname=data.LastName;
                this.neck=data.Neck;
                this.sex=data.Sex;
                this.username=data.Username;
                this.waist=data.Waist;
                this.weight=data.Weight;
                this.poslednjiDatum=data.poslednjiDatum;
                
                if (data.foods != null) 
                {
                    
                    data.foods.forEach(element => {
                        
                        let kCal = element.food.kCal*element.Amount/100;
                        let proteins = element.food.Proteins*element.Amount/100;
                        let carbs = element.food.Carbs*element.Amount/100;
                        let fats = element.food.Fats*element.Amount/100;

                        const unetaHranaObj = new UnetaHrana(element.ID,element.Amount,element.datum,element.food.Name,kCal,proteins,carbs,fats,element.food.Type,element.food.Micronutrient);

                        this.foods.push(unetaHranaObj);
                    });
                }
            })
            .then(e => {
                this.drawProfile();
            })
            .catch(err =>
                {
                   /* let errorDiv = this.container.querySelector(".errorDiv");
                    console.log(errorDiv);
                    if(errorDiv.innerHTML != " ")
                    {
                        errorDiv.innerHTML = " ";
                    }
                   createEl("errorP","p",err,errorDiv);*/

                   console.log(err)
                }
                
            );
    }

    prom()
    {
        let divForm = this.container.querySelector(".divForm");
        console.log(divForm);
        divForm.innerHTML = " ";

        createEl("","h2","Promenite podatke",divForm);

        let forma = createEl("formCon","div","",divForm);

        let form = createEl("","div","",forma);

        let ul = createEl("flex-outer","ul","",form)

        

        let li2 = createEl("","li","",ul);
        createEl("","label","Password :", li2);
        let pass =createInput("","password","password","Unesite password",li2);
        pass.value=this.password;

        let li3 = createEl("","li","",ul);
        createEl("","label","Potvrdite password :", li3);
        let pass2 = createInput("","password","password2","Potvrdite password",li3);
        pass2.value=this.password;

        let li4 = createEl("","li","",ul);
        createEl("","label","Ime :", li4);
        let im = createInput("","text","ime","Unesite ime",li4);
        im.value=this.firstname;

        let li6 = createEl("","li","",ul);
        createEl("","label","Prezime :", li6);
        let prez = createInput("","text","prezime","Unesite prezime",li6);
        prez.value=this.lastname;

        let li5 = createEl("","li","",ul);
        createEl("","p","Pol :",li5);
        let ul2 = createEl("flex-inner","ul","",li5);

        let li51 = createEl("","li","",ul2);
        var ch1 = createEl("","input","",li51);
        ch1.type="radio";
        ch1.value="m";
        ch1.name="pol";
        let lbl1 = createEl("","label","Muski",li51);
        

        let li52 = createEl("","li","",ul2);
        var ch2 = createEl("","input","",li52);
        ch2.type="radio";
        ch2.value="z";
        ch2.name="pol";
        let lbl2 = createEl("","label","Zenski",li52);
        
        
        if(this.sex=="m")
        {
            ch1.checked=true;
        }
        else{
            ch2.checked=true;
        }

        let li7 = createEl("","li","",ul);
        createEl("","label","Godine :", li7);
        let num = createInput("","number","godine","Unesite godine",li7);
        num.value=this.age;

        let li8 = createEl("","li","",ul);
        createEl("","label","Tezina :", li8);
        let wei = createInput("","number","tezina","Unesite tezinu u kg",li8);
        wei.value=this.weight;

        let li9 = createEl("","li","",ul);
        createEl("","label","Visina :", li9);
        let hei = createInput("","number","visina","Unesite visinu u cm",li9);
        hei.value=this.height;

        let li10 = createEl("","li","",ul);
        createEl("","label","Struk :", li10);
        let wai = createInput("","number","struk","Unesite struk u cm",li10);
        wai.value=this.waist;

        let li101 = createEl("","li","",ul);
        createEl("","label","Vrat :", li101);
        let nec = createInput("","number","vrat","Unesite vrat u cm",li101);
        nec.value = this.neck;

        let li11 = createEl("","li","",ul);
        createEl("","p","Nivo aktivnosti :",li11);
        let ul22 = createEl("flex-inner","ul","",li11);

        let li522 = createEl("","li","",ul22);
        let ch3 = createInput("","radio","sedentaran","",li522);
        ch3.value="sedentaran";
        ch3.name="aktivnost"
        let lbl3 = createEl("","label","Sedentaran",li522);
        

        let li53 = createEl("","li","",ul22);
        let ch4 = createInput("","radio","blago aktivan","",li53);
        ch4.value="blago aktivan";
        ch4.name="aktivnost";
        let lbl4 = createEl("","label","Blago aktivan",li53);

        let li54 = createEl("","li","",ul22);
        let ch5 = createInput("","radio","umereno aktivan","",li54);
        ch5.value="umereno aktivan";
        ch5.name="aktivnost";
        let lbl5 = createEl("","label","Umerno aktivan",li54);

        let li55 = createEl("","li","",ul22);
        let ch6 = createInput("","radio","vrlo aktivan","",li55);
        ch6.value="vrlo aktivan";
        ch6.name="aktivnost";
        let lbl6 = createEl("","label","Vrlo aktivan",li55);

        let li56 = createEl("","li","",ul22);
        let ch7 = createInput("","radio","ekstra aktivan","",li56);
        ch7.value="ekstra aktivan";
        ch7.name="aktivnost";
        let lbl7 = createEl("","label","Ekstra aktivan",li56);
        console.log(this.activity);
        if(this.activity=="ekstra aktivan")
        {
            ch7.checked=true;
        }
        else if (this.activity=="vrlo aktivan")
        {
            ch6.checked=true;
        }
        else if (this.activity=="umerno aktivan")
        {
            ch5.checked=true;
        }
        else if (this.activity=="blago aktivan")
        {
            ch4.checked=true;
        }
        else if (this.activity=="sedentaran")
        {
            ch3.checked=true;
        }
        

        let li44 = createEl("","li","",ul);
        let buttSignin = createEl("","button","Promeni podatke", li44);

        createEl("errorDiv","div","",form);
        createEl("sucDiv","div","",form);

        buttSignin.onclick = ev =>
        {
           let akt = this.container.querySelector('input[name="aktivnost"]:checked').value
            let poll = this.container.querySelector('input[name="pol"]:checked').value;
            console.log(poll);
            fetch("https://localhost:5001/DietApp/PromeniKorisnika/",
            {
                method:"PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(
                    {
                        ID:this.id,
                        Username:this.username,
                        FirstName:im.value,
                        LastName:prez.value,
                        Sex:poll,
                        Age:num.value,
                        Weight:wei.value,
                        Height:hei.value,
                        Neck: nec.value,
                        Waist:wai.value,
                        Activity:akt,
                        Password:pass.value,
                        CurrentCalories:this.currentCalories
                    })
            })
            .then(res => {
                if(!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                   }
                  else {
                   return res.text();
                 } 
            })
            .then(data => {
                let sucDiv = this.container.querySelector(".sucDiv");
                    console.log(sucDiv);
                    if(sucDiv.innerHTML != " ")
                    {
                        sucDiv.innerHTML = " ";
                    }
                   createEl("sucP","p",data,sucDiv);
                   this.fetchProfile(this.id);
            })
            .catch(err =>
                {
                    let errorDiv = this.container.querySelector(".errorDiv");
                    console.log(errorDiv);
                    if(errorDiv.innerHTML != " ")
                    {
                        errorDiv.innerHTML = " ";
                    }
                   createEl("errorP","p",err,errorDiv);
                }
            );
    }}

    dodaj()
    {
        
        let divForm = this.container.querySelector(".divForm");
        console.log(divForm);
        divForm.innerHTML = " ";
        
        createEl("","h2","Dodajte namernicu",divForm);
        
        let forma = createEl("formCon","div","",divForm);
        
        let form = createEl("","div","",forma);
        
        let ul = createEl("flex-outer","ul","",form)
        
        
        
        let li5 = createEl("","li","",ul);
        createEl("","p","Tip namernice :",li5);
        
        let sec = createEl("tipovi","select","",li5);
        sec.name="tipovi";
        sec.id="tipovi";

        
        fetch("https://localhost:5001/DietApp/PreuzmiTipove")
        .then(p=>{
            p.json().then(data => 
                {
                    data.forEach(element => {
                        let op = createEl("","option",element,sec);
                        op.value=element;
                    });
                })
        })
        let li3 = createEl("","li","",ul);
        let buttTipovi = createEl("buttTipovi","button","Izaberi tip",li3);

        
        
        let li6 = createEl("","li","",ul);
        buttTipovi.onclick = ev =>
        {
            let op = this.container.querySelector(".tipovi");
            console.log(op.value);
            let opVal = op.value;
            
            createEl("","p","Izaberi namernicu :",li6);

            let sec = createEl("namernice","select","",li6);
            sec.name="namernice";
            sec.id="namernice";

            fetch("https://localhost:5001/DietApp/PreuzmiNamernice/"+opVal)
            .then(p=>{
                p.json().then(data => 
                {
                    data.forEach(element => {

                        let op = createEl("","option",element,sec);
                        op.value=element;
                        console.log(element);
                    });
                })
            })

            let buttt = this.container.querySelector(".buttTipovi");
            buttt.style.display="none";


            let li7 = createEl("","li","",ul);
            createEl("","p","Kolicina :",li7);
            let inputKol = createInput("","number","kolicina","Unesite kolicinu u gramima",li7);


            let li10 = createEl("","li","",ul);
            let buttDodaj = createEl("buttDodaj","button","Dodaj namernicu",li10);

            buttDodaj.onclick=ev =>
            {
                let nam = this.container.querySelector(".namernice");
                console.log(nam.value);
                let namVal = nam.value;

                //let kol = this.container.querySelector(".kolicina");
                //console.log(kol);

                fetch("https://localhost:5001/DietApp/DodajNamernicu/"+ this.id +"/"+nam.value+"/"+kolicina.value,
                {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(
                        {
                        })
                })
                .then(res => {
                    if(!res.ok) {
                        return res.text().then(text => { throw new Error(text) })
                       }
                      else {
                       return res.json();
                     } 
                })
                .then(e => {
                    this.fetchProfile(this.id);
                })
                .catch(err =>
                    {
                        let errorDiv = this.container.querySelector(".errorDiv");
                        console.log(errorDiv);
                        if(errorDiv.innerHTML != " ")
                        {
                            errorDiv.innerHTML = " ";
                        }
                       createEl("errorP","p",err,errorDiv);
                    }
                ); 
            }

        }


    }
    drawProfile()
    {
        let loginEl = this.container.querySelector(".loginEl");
        let signInEl = this.container.querySelector(".signInEl");
        let logoutEl = this.container.querySelector(".logoutEl");
        let welcomeEl = this.container.querySelector(".welcomeEl");
        let promEl = this.container.querySelector(".promEl");
        let dodajEl = this.container.querySelector(".dodajEl");
        let obrisiEl = this.container.querySelector(".obrisiEl");

        if (obrisiEl.style.display === "none") {
            obrisiEl.style.display = "block";
        }
        else {
            obrisiEl.style.display = "none";
        }
       
        if (dodajEl.style.display === "none") {
            dodajEl.style.display = "block";
        }
        else {
            dodajEl.style.display = "none";
        }

        if (promEl.style.display === "none") {
            promEl.style.display = "block";
        }
        else {
            promEl.style.display = "none";
        }

        if(promEl.style.display === "block")
        {
            if (loginEl.style.display === "none") {
                loginEl.style.display = "block";
            }
            else {
            loginEl.style.display = "none";
            }

            if (signInEl.style.display === "none") {
            signInEl.style.display = "block";
                }
            else {
            signInEl.style.display = "none";
            }
        }

        obrisiEl.style.display = "block";
        dodajEl.style.display = "block";
        promEl.style.display = "block";
        logoutEl.style.display = "block";
        welcomeEl.style.display = "block";
        welcomeEl.innerHTML="Welcome "+ this.username; 

        
        let divForm = this.container.querySelector(".divForm");
        console.log(divForm);
        divForm.innerHTML = " ";
        
        
        
        let divInformation = this.container.querySelector(".divInformation");
        divInformation.innerHTML = " ";
        
        createEl("","h2",this.firstname+" "+this.lastname,divInformation);
        createEl("","h3","Uneto danas kalorija : "+this.currentCalories+" kCal",divInformation);
        
        let kalorijeProgres = createEl("","div","",divInformation);
        kalorijeProgres.id="kalorijeProgres";
        let kalorijeBar = createEl("","div","0 %",kalorijeProgres);
        kalorijeBar.id="kalorijeBar";
        this.moveKalorije(this.currentCalories,this.calories);
        createEl("","h3","Kalorije : "+this.calories+" kCal",divInformation);
        
        
        createEl("","h3","Body Mass Index : "+(this.bmi).toFixed(2)+" kg/m2",divInformation);
        
        let bmiProgres = createEl("","div","",divInformation);
        bmiProgres.id="bmiProgres";
        let bmiBar = createEl("","div","0 kg/m2",bmiProgres);
        bmiBar.id="bmiBar";
        this.moveBmi(this.bmi);
        let labelBmi = createEl("","h4","",divInformation);
        if (this.bmi > 50)
        {
            labelBmi.style.color = "darkred";
            labelBmi.innerHTML = "Gojazan";
        }
        else if (this.bmi >40)
        {
            labelBmi.style.color = "red";
            labelBmi.innerHTML = "Gojazan";
        }
        else if (this.bmi >30)
        {
            labelBmi.style.color = "pink";
            labelBmi.innerHTML = "Gojazan";
        }
        else if (this.bmi >25)
        {
            labelBmi.style.color = "yellow";
            labelBmi.innerHTML = "Prekomerna težina";
        }
        else if (this.bmi >18.5)
        {
            labelBmi.style.color = "green";
            labelBmi.innerHTML = "Normalno";
        }
        else if (this.bmi >17)
        {
            labelBmi.style.color = "yellow";
            labelBmi.innerHTML = "Nedovoljna težina";
        }
        else if (this.bmi >16)
        {
            labelBmi.style.color = "red";
            labelBmi.innerHTML = "Nedovoljna težina";
        }
        
        
        
        createEl("","h3","Body Fat : "+(this.bodyfat).toFixed(2)+" %",divInformation);
        
        let bodyfatProgres = createEl("","div","",divInformation);
        bodyfatProgres.id="bodyfatProgres";
        let bodyfatBar = createEl("","div","0 kg/m2",bodyfatProgres);
        bodyfatBar.id="bodyfatBar";
        this.moveBodyfat(this.bodyfat);
        
        let labelBodyfat = createEl("","h4","",divInformation);
        if (this.bodyfat > 25)
        {
            labelBodyfat.style.color = "darkred";
            labelBodyfat.innerHTML = "Gojazan";
        }
        else if (this.bodyfat >18)
        {
            labelBodyfat.style.color = "yellow";
            labelBodyfat.innerHTML = "Srednje";
        }
        else if (this.bodyfat >14)
        {
            labelBodyfat.labelBmi.style.color = "darkgreem";
            labelBodyfat.labelBmi.innerHTML = "Fitnes";
        }
        else if (this.bodyfat >6)
        {
            labelBodyfat.style.color = "green";
            labelBodyfat.innerHTML = "Atletski";
        }
        else if (this.bodyfat >2)
        {
            labelBodyfat.style.color = "yellow";
            labelBodyfat.innerHTML = "Esencijalan";
        }
        else if (this.bodyfat >0)
        {
            labelBodyfat.style.color = "darkRed";
            labelBodyfat.innerHTML = "Esencijalan";
        }
        createEl("","h3","Poslednji put dodata namernica: "+this.poslednjiDatum,divInformation);

        ///div forma tabela
        createEl("","h2",`Dobro dosli ${this.username}`,divForm);
        
        let divTabela = createEl("divTabela","div","",divForm);
        let tabela = createEl("","table","",divTabela);

        let header = createEl("","thead","",tabela);
        let red = createEl("","tr","",header);

        let el = createEl("","th","Name",red);
        el = createEl("","th","Amount (g)",red);
        el = createEl("","th","kCal",red);
        el = createEl("","th","Proteins",red);
        el = createEl("","th","Carbs",red);
        el = createEl("","th","Fats",red);
        el = createEl("","th","Type",red);
        el = createEl("","th","Micronutrient",red);
        el = createEl("","th","Date",red);

        let tbody = createEl("","tbody","",tabela);
        this.foods.forEach((proiz,index) => {
            console.log(proiz);
            const r = proiz.crtajRed(tbody);
            
        })
    }
    
    moveBodyfat(bodyfat)
    {
        var i = 0;
        let procenti = bodyfat/50*100;
        
        if (i == 0) {
            i = 1;
            var elem = this.container.querySelector("#bodyfatBar");
            var width = 10;
            var id = setInterval(frame, 10);
            function frame() {
              if (width >= procenti) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                if (width > 40)
                {
                    elem.style.width = 100 + "%";
                    elem.style.backgroundColor = "darkred";
                    elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
                else if (width >36)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "yellow";
                elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
                else if (width >28)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "green";
                elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
                else if (width >6)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "lightgreen";
                elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
                else if (width >2)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "yellow";
                elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
                else if (width >0)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "darkred";
                elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
                else
                {
                elem.style.width = width + "%";
                elem.innerHTML = (bodyfat).toFixed(2)  + " %";
                }
              }
            }
          }
    }
    moveBmi(bmi)
    {
        var i = 0;
        let procenti = bmi/50*100;

        if (i == 0) {
            i = 1;
            var elem = this.container.querySelector("#bmiBar");
            var width = 10;
            var kal = 0;
            var id = setInterval(frame, 10);
            function frame() {
              if (width >= procenti) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                if (width > 100)
                {
                    elem.style.width = 100 + "%";
                    elem.style.backgroundColor = "darkred";
                    elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >80)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "red";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >75)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "red";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >60)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "pink";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >50)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "yellow";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >37)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "green";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >34)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "yellow";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else if (width >32)
                {
                elem.style.width = width + "%";
                elem.style.backgroundColor = "red";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
                else
                {
                elem.style.width = width + "%";
                elem.innerHTML = (bmi).toFixed(2)  + "kg/m2";
                }
              }
            }
          }

    }
    moveKalorije(trenutneKalorije,kalorije)
    {
        var i = 0;
        let procenti = trenutneKalorije/kalorije*100;

        if (i == 0) {
            i = 1;
            var elem = this.container.querySelector("#kalorijeBar");
            var width = 10;
            var kal = 0;
            var id = setInterval(frame, 10);
            function frame() {
              if (width >= procenti) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                if (width > 100)
                {
                    elem.style.width = 100 + "%";
                    elem.style.backgroundColor = "red";
                    elem.innerHTML = (procenti).toFixed(2)  + "%";
                }
                else
                {
                elem.style.width = width + "%";
                elem.innerHTML = width  + "%";
                }
              }
            }
          }
        
    }
}