import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServicesComponent } from './services/services.component';



const appRoutes:Routes =[
    {path: '', redirectTo: '/main', pathMatch: 'full' },
    {path:'main',component:MainScreenComponent},
    {path:'cat/:id',component:MainScreenComponent},
    {path:'product-detail/:id',component:ProductDetailsComponent},
    {path:'login',component:SignInComponent},
    {path:'signup',component:SignUpComponent},
    {path:'order',component:OrderComponent},
    {path:'cart',component:CartComponent},
    {path:'about-us',component:AboutUsComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path:'services',component:ServicesComponent},
    {path:'myorder/:id',component:OrderComponent},
];


@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports :[RouterModule]
})

export class AppRoutingModule{

}