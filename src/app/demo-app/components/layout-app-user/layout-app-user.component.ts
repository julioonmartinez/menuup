import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DemoService } from '../../../shared/services/demo.service';

import { AuthService } from '../../../shared/services/auth.service';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-app-user',
  standalone: true,
  imports: [CommonModule, RouterLink, MatProgressBarModule, RouterModule, MatListModule ,MatSidenavModule, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './layout-app-user.component.html',
  styleUrl: './layout-app-user.component.scss'
})
export class LayoutAppUserComponent implements OnInit {
  
  
  modeSideNav: MatDrawerMode = 'over';
  sidenav: boolean = false;
  user: any = null;
  moodMenuMake = false;
  moodMenuDemoMake = false;
  loading:boolean = true;

  menu:BusinessInformation | null = null;

  listNav: {link:string, icon:string}[] = [];

  constructor(
    private demoService: DemoService,
    private router : Router,
    private authService : AuthService,
  ){}
  
  ngOnInit(): void {
  this.adjustSidenav(window.innerWidth);

  this.demoService.currentMene$.subscribe(dataMenu=>{
    this.menu = dataMenu;
    console.log('menu:', this.menu)
  })

  

  
  this.authService.currentUser$.subscribe((user) => {
    if (user) {
      this.user = user;
      console.log('Usuario autenticado:', user.uid);
      this.loading = false;
      // Aquí puedes cargar los datos protegidos
    } else {
      console.log('No hay usuario autenticado.');
      this.loading = false
      user = null
    }
  });
  };

  


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSidenav(event.target.innerWidth);
  }

  adjustSidenav(width: number) {
    if (width < 950) {  // Para pantallas pequeñas
      // this.modeSideNav = 'd';
      this.sidenav = false;
    } else {  // Para pantallas grandes
      // this.modeSideNav = 'side';
      this.sidenav = true;
    }
  }

  
  isAuth(){
    this.user = this.authService.getCurrentUser()
    console.log(this.user)
    
  }
  routerLinkShowDemoMenu(){
    const nameLocalStoarge = this.demoService.nameLocalStorageDemoBussiness
    const itemBUssiness = localStorage.getItem(nameLocalStoarge)

   if(itemBUssiness){
    const bussiness: BusinessInformation = JSON.parse(itemBUssiness)
    console.log(bussiness)
    this.router.navigateByUrl(`/menu-demo-layout-01/${bussiness.id}/home`)
   }
  }

  logout(){
    this.authService.logout().subscribe({
      next:()=>{
        const nameLocalStorageBussinessDemo = this.demoService.nameLocalStorageDemoBussiness
          localStorage.removeItem(nameLocalStorageBussinessDemo)
        this.router.navigateByUrl('/')
      }
    })
  }

  get IdBusiness(){
    return this.demoService.idBusiness
  }
}
