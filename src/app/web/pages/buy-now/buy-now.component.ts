import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { LoginComponent } from '../login/login.component';
import { LoginBuyComponent } from "../../../shared/components/login-buy/login-buy.component";
import { RegisterBuyComponent } from "../../../shared/components/register-buy/register-buy.component";
import { CommonModule } from '@angular/common';
import { PaypalButtonComponent } from "../../../shared/components/paypal-button/paypal-button.component";
import {UserTap} from "../../../shared/interfaces/user-tap";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RegisterBuyComponent, LoginBuyComponent, LoginComponent, LoginBuyComponent, RegisterBuyComponent, PaypalButtonComponent],
  templateUrl: './buy-now.component.html',
  styleUrl: './buy-now.component.scss'
})
export class BuyNowComponent {

  periods: {period:'monthly' | 'annual', price: string}[] =[
    {period: 'monthly', price: '1.00'},
    {period:'annual', price: '2.00'}
  ];

  user : UserTap = {
    email: '',
    role: 'free',
    create: new Date(),
  }


  period: {period:'monthly' | 'annual', price: string} | null = null;

  currentUser : User | null = null;

  actionWithoutAccount: 'login' | 'register' = 'register';
  
  constructor(
    private activatedRouter : ActivatedRoute,
    private authService : AuthService
  ){
    this.activatedRouter.paramMap.subscribe(params=>{
      const periodParams = params.get('period')
      const periodRef = this.periods.find(per=> per.period == periodParams)
      if (periodRef){
        this.period = periodRef
      }
      console.log(this.period)
    });

    this.authService.currentUser$.subscribe(userData=>{
      this.currentUser = userData;
      if(this.currentUser){
        this.authService.getInfoUser(this.currentUser.uid).subscribe(userDa=>{
          this.user = userDa
          console.log(userDa)
        })
        
      }

    })


    
  }

  setLogin(){
    this.actionWithoutAccount = 'login';
  }

  setRegister(){
    this.actionWithoutAccount = 'register'
  }

  setMonthly() {
    const periosRef = this.periods.find(per=> per.period == 'monthly');
    if(periosRef){
      this.period = periosRef
    }
  }

  setAnnual() {
    const periosRef = this.periods.find(per=> per.period == 'annual');
    if(periosRef){
      this.period = periosRef
    }
  }


}
