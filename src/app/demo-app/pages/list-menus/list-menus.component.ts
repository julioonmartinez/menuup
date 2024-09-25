import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { AuthService } from '../../../shared/services/auth.service';
import { DemoService } from '../../../shared/services/demo.service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BusinessInformation } from '../../../shared/interfaces/business-information';

@Component({
  selector: 'app-list-menus',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatDividerModule, MatCardModule, MatIconModule, MatListModule, MatButton, RouterLink],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.scss'
})
export class ListMenusComponent {

  listMenu: BusinessInformation[] = [];
  userUd: string | null = null;
  loading: Boolean = true;
  constructor(
    private authService: AuthService,
    private demoService: DemoService
  ){
    this.getIdUser()
  }

  getIdUser(){
    this.authService.currentUser$.subscribe({
      next:(idUSer)=>{
        this.userUd = idUSer?.uid!
        if(this.userUd){
          this.demoService.getListBusinessListForUser(this.userUd).subscribe(list=>{
            console.log(list)
            this.listMenu = list
            this.loading = false
          })
        }
      },
      error:(err)=>{
        this.loading = false
        console.error(err)
      }
    })
  }


  
  

}
