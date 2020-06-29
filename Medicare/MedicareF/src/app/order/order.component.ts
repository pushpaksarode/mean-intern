import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any;

  constructor(private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {

    let id2 = this.route.snapshot.paramMap.get('id'); 

    if(sessionStorage.getItem("user_id")===id2){
    this.http.get("http://localhost:3005/api/myorder/" + id2)
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
        this.orders = posts;
      })
    } else {
      alert("Invalid URL !");
    }
  }

  cancelOrder(index: number){
    let orderId: string;
    this.orders[index].status="Cancelled";
    orderId=this.orders[index]._id
    this.http.put("http://localhost:3005/api/order/" + orderId,{status:"Cancelled"}).subscribe(responseData => {
      console.log(responseData);
      // alert("Order Cancelled !");
    });
  }

}
