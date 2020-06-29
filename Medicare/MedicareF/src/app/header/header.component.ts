import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../product.service';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Category } from '../category.model';
import { Userlogin } from '../userlogin.model';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = new BehaviorSubject<Userlogin>(null);

  username: string;
  constructor(private productServi: ProductServices, private http: HttpClient, private router: Router) { }

  session_set = false;
  isAdmin = true;
  userid = null;

  category: Category[];

  ngOnInit(): void {

    if (sessionStorage.getItem("user_firstname")) {
      this.username = sessionStorage.getItem("user_firstname");
      this.userid = sessionStorage.getItem("user_id");
      this.session_set = true;

      if ("5ee47ba098d16d36c4407a6d" === (localStorage.getItem("user_id"))) {
        this.isAdmin = false;
      }
    } else {
      this.session_set = false;
    }

    this.http.get<{ [key: string]: Product }>("http://localhost:3005/api/categories")
      .pipe(map(responseData => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key })
          }
        }

        return postArray;


      })).subscribe(category => {
        // console.log("array"+posts);
        this.category = category;
        //  this.products = posts;
      })

      ;

  }

  logout() {
    this.userid = null;
    this.user.next(null);
    this.router.navigate(['/login']);

    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_firstname');
    sessionStorage.removeItem('user_lastname');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_address');
    this.session_set = false;
  }

}
