import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ProductServices } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user : User;
  constructor(private productServi :ProductServices,private http:HttpClient) { }
  ngOnInit(): void {
  }
  onCreatePost(postData: { firstname: string; lastname: string, email: string; address: string, password: string; },form:NgForm){
    console.log(postData);
    this.http .post('http://localhost:3005/api/signup',postData).subscribe(responseData => {
        console.log(responseData);
        alert("Welcome Account Successfully Created!");
        form.reset();
      });
  }
}