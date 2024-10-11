import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-layout-user',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterOutlet, MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule,MatListModule],
  templateUrl: './layout-user.component.html',
  styleUrl: './layout-user.component.scss'
})
export class LayoutUserComponent {
  currentUser : User | null = null;

  constructor(
    private authService : AuthService
  ){
    this.authService.currentUser$.subscribe(user=>{
      this.currentUser = user
    })

  }

  logout(){
    this.authService.logout()
  }
}
