import { Product } from './product.model';
import { Component, EventEmitter, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductServices {

    products: Product[];
    //     =
    //   [
    //       new Product('Dabur Honey',`India's No.1 Honey -250g + Get 30% Extra`,'coming soon','dabur_honey.jpg',180,150,39),  //object create

    //       new Product('Dabur Chyawanprash','Dabur Chyawanprash 2X Immunity - 500g','coming soon','dabur_chyawanprash.jpg',200,162,43)
    //   ];

    constructor(private http: HttpClient) {
    }

    getProduct() {
        return this.products.slice();
    }



    fetchData() {
        this.http.get<{ [key: string]: Product }>("http://localhost:3005/api/products")
            .pipe(map(responseData => {
                const postArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({ ...responseData[key], id: key })
                    }
                }

                return postArray;


            })).subscribe(posts => {
                console.log("array" + posts);

                this.products = posts;
            })

            ;
    }


}
