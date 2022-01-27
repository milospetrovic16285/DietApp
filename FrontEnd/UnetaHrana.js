import { createEl,createInput } from "./helperFunkcije.js";

export class UnetaHrana 
{
    constructor(id,amount,datum,name,kCal,proteins,carbs,fats,type,micronutrient)
    {
        this.id=id;
        this.amount=amount;
        this.datum=datum;
        this.name=name;
        this.kCal=kCal;
        this.proteins=proteins;
        this.carbs=carbs;
        this.fats=fats;
        this.type=type;
        this.micronutrient=micronutrient;

        this.container=null;
    }

    crtajRed(tabela)
    {
        const red = createEl("","tr","",tabela);
        createEl("","td",this.name,red);
        createEl("","td",this.amount,red);
        createEl("","td",this.kCal,red);
        createEl("","td",(this.proteins).toFixed(2),red);
        createEl("","td",(this.carbs).toFixed(2),red);
        createEl("","td",(this.fats).toFixed(2),red);
        createEl("","td",this.type,red);
        createEl("","td",this.micronutrient,red);
        createEl("","td",this.datum,red);

    }
}