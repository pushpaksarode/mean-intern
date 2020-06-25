import { Component, OnInit } from '@angular/core';
import { Userlogin } from '../userlogin.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import { Product } from '../product.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {
  user = new BehaviorSubject<Userlogin>(null);
  constructor( private route: ActivatedRoute,
    private router: Router,private http:HttpClient) { }
  
    ngOnInit() {
  }

  loginClicked(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    const login = { email :email,password:password};

    //alert(password); 

    this.http.post('http://localhost:3005/api/signin',login).subscribe(responseData => {
      console.log(responseData);
      

      // if(responseData.user.firstname){
      //   this.handleAuthentication(responseData.user.email,responseData.user._id,responseData.user.firstname, responseData.user.lastname);
      //   this.router.navigate(['/main']);
      // }

      this.router.navigate(['/main']);


    });
    form.reset();
  }

  private handleAuthentication(
    email: string,
    userId: string,
    firstname: string,
    lastname:string
  )
  {
   
    const user = new Userlogin(email, userId, firstname, lastname);
    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user)); // option 1
    localStorage.setItem('user_email', email);  // option 2
    localStorage.setItem('user_firstname', firstname);  // option 3
    localStorage.setItem('user_lastname', lastname);  // option 4
    localStorage.setItem('user_id', userId);  // otpion 5
 
    sessionStorage.setItem('user_firstname', firstname);

  }
}