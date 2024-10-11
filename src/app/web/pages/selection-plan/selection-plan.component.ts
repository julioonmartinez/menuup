import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { UserTap } from '../../../shared/interfaces/user-tap';
import { PaypalButtonComponent } from '../../../shared/components/paypal-button/paypal-button.component';

@Component({
  selector: 'app-selection-plan',
  standalone: true,
  imports: [PaypalButtonComponent, RouterLink, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './selection-plan.component.html',
  styleUrl: './selection-plan.component.scss'
})
export class SelectionPlanComponent {

 

  price: string = '1.00';  // Precio por defecto
  period: 'monthly' | 'annual' = 'monthly'; // Período por defecto;
  user: UserTap | null = null;

  currenUser : User | null = null;
  constructor(
    private authService : AuthService
  ){
    this.authService.currentUser$.subscribe(userFire=>{
      this.currenUser = userFire
      console.log(this.currenUser)
      if(this.currenUser){
        authService.getInfoUser(this.currenUser.uid).subscribe(dataUser=>{
          this.user = dataUser;
          console.log(this.user)
        })
      }
    })
  }

  setMonthly() {
    this.price = '1.00';
    this.period = 'monthly';
  }

  setAnnual() {
    this.price = '2.00';
    this.period = 'annual';
  }

}
