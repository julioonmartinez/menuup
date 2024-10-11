import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-layout-web',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatToolbarModule, RouterOutlet],
  templateUrl: './layout-web.component.html',
  styleUrl: './layout-web.component.scss',
})
export class LayoutWebComponent {

  
  currentUser: User | null = null;

  constructor(
    private authService : AuthService,
  ){
    this.authService.currentUser$.subscribe(user=>{
      this.currentUser = user;
      
    })

  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  logout(){
    this.authService.logout()
  }
  
}
