import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { UserTap } from '../../../shared/interfaces/user-tap';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NoRegisterComponent } from '../../../web/components/no-register/no-register.component';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatIconModule, NoRegisterComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  currenUser: User | null = null;

  user: UserTap | null = null;


  constructor(
    private authService : AuthService,
  ){

    this.getCurretUser();

  }

  getCurretUser(){
    this.authService.currentUser$.subscribe(userFirebase=>{
      if(userFirebase){
        this.currenUser = userFirebase
        

      }
     
      
    })
  }

  logout(){
    this.authService.logout()
  }

}
