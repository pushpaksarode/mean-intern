import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { CartServices } from '../cart.service';
import { Cart } from '../cart.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  products:any;
  @ViewChild('ingre_qty') ingre_qty : ElementRef;

  // product_id : string;
  // product_name :string;
  // product_count :number;
  // product_price : number;

  constructor( private route: ActivatedRoute,
    private router: Router,private http:HttpClient,private cartServi:CartServices) { }

    ngOnInit() {

      let id2 = this.route.snapshot.paramMap.get('id'); 

      this.http.get/*<{[key:string]:Product}>*/("http://localhost:3005/api/product/"+id2).subscribe(posts =>{
        console.log("array"+posts);
       this.products = posts;
      });
    }


    addTocart()
    {
      // console.log(this.products._id);
      // cart :Cart;
      const qty = this.ingre_qty.nativeElement.value;

      let id = this.products._id;
      let product_name = this.products.name;
      let product_count = qty;
      let product_image = this.products.productImagePath;
      let product_price = this.products.price;
      let product_total = qty * product_price;

      console.log(this.products.name);
      console.log(qty);
      const cartItems = new Cart(this.products._id,product_name,product_count,product_image,product_price,product_total);

      console.log(cartItems);
       this.cartServi.addCart(cartItems);
      this.router.navigateByUrl('/cart');
    }

  } 

