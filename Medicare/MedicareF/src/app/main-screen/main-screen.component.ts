import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../product.service';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  products: Product[];
  categoryDetails: any;
  mySubscription: any; // for reloading component 

  constructor(private route: ActivatedRoute,
    private router: Router, private productServi: ProductServices, private http: HttpClient) {
    // code in this constructor is for reloading component
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {

    let id2 = this.route.snapshot.paramMap.get('id');

    // for default loading
    if (id2 == null) {
      id2 = "5ee21562780f29183027e584";
    }

    // this.http.get<{[key:string]:Product}>("http://localhost:3005/api/products")
    this.http.get<{ [key: string]: Product }>("http://localhost:3005/api/cat/" + id2)
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
      });


    // to get category name on main-screen
    this.http.get/*<{[key:string]:Product}>*/("http://localhost:3005/api/category/" + id2).subscribe(posts => {
      console.log("array" + posts);
      this.categoryDetails = posts;
    });

  }


  // this is destructor for reloading component
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
