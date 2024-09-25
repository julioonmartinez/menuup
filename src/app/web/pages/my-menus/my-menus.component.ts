import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'firebase/auth';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MenusUserService } from '../../../shared/services/menus-user.service';
import { CardMenusComponent } from '../../components/card-menus/card-menus.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { DemoService } from '../../../shared/services/demo.service';

@Component({
  selector: 'app-my-menus',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    CardMenusComponent,
    RouterLink,
  ],
  templateUrl: './my-menus.component.html',
  styleUrl: './my-menus.component.scss'
})
export class MyMenusComponent {

  public currenUser: User | null = null;
  public menus: BusinessInformation[] = [];


  constructor(
    private menusUserService : MenusUserService,
    private authService : AuthService,
    
   
  ){

    this.authService.currentUser$.subscribe(user=>{
      this.currenUser = user
      if(this.currenUser){
        this.getMenusUser(this.currenUser.uid)
      }
    })

    
   

  }

  getMenusUser(idUser:string){
    this.menusUserService.getMenusUser(idUser).subscribe(menusData=>{
      this.menus = menusData
      console.log(menusData)
    })

  }

  
  
 
   

}
