import { Category } from './category.model';
import { from } from 'rxjs';

export class Product
{
    public _id? : string;
    public name : string;
    public info : string;
    public description : string;
    public mrp : number;
    public price : number;
    public category : [Category];
    public stock : number;
    public productImagePath : string;
    

    constructor(p_name:string, p_info:string, p_desc:string, p_mrp:number, p_price:number,  p_total_sold:number, p_imagePath:string){
        this.name = p_name;
        this.info = p_info;
        this.description = p_desc;
        this.mrp = p_mrp;
        this.price = p_price;
        this.stock = p_total_sold;
        this.productImagePath = p_imagePath;
    }
}



