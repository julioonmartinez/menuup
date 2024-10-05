import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../../shared/services/menu.service';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { GeneralAppService } from '../../../shared/services/general-app.service';
import { MatListModule } from '@angular/material/list';
import { User } from 'firebase/auth';
import { RouterLink } from '@angular/router';
import { MatCardModule, MatCardSmImage } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,  RouterLink, MatButtonModule, MatIconModule, MatListModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  url:string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/restaurant%2Fameyalli%2Fplatillos%2FDALL%C2%B7E%202024-08-31%2013.18.31%20-%20A%20delicious%20restaurant%20dish%20featuring%20an%20order%20of%20empanadas%20de%20carne.%20The%20plate%20showcases%20three%20golden-brown%20empanadas%20filled%20with%20seasoned%20meat%2C%20arra.webp?alt=media&token=75a084b1-6b8b-4fdc-85ff-7293666da58c'


  ulrIconoRestaurante = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2Frestaruante%20icono.jpeg?alt=media&token=a7f3b12b-6f13-4956-9ccb-3bc92bd4e6a3'

  urlIconBar = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_fb8c4235-d49d-4558-958c-4cee237b12de.jpeg?alt=media&token=7bc094c2-5498-4e33-b463-b1a9ca2ca0d0';
  urlIconTienda = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_d46c91dd-8988-4fdd-a098-216de656aced.jpeg?alt=media&token=f6276046-655b-4f58-9142-96d9176b8f18'

  urlIconFrelancer = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_51bb54a8-6e9b-44bd-9494-00e3be53044d.jpeg?alt=media&token=4ab94a78-3c87-45e7-824d-661f2f01673d';

  urlEstilo = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_1beacaa6-39cc-4162-b0c9-036b9f7c4ecf.jpeg?alt=media&token=8a4cf755-cdfc-4b22-9e50-d89c7bae7e7c'
  urlEncuestas = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_ba1456b6-3f76-4585-ae7c-8be5c218a710.jpeg?alt=media&token=e55481f5-2a01-4631-8fb6-d6041c3ef2fe'
  urlMenu = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_4b7b1778-10c8-47d5-99f1-b04350790581.jpeg?alt=media&token=0adba139-e6a8-489a-8787-f93e2ef1b669'

  urlCodigoQR = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_aca806e1-da52-472f-a01e-c4a9256847fb.jpeg?alt=media&token=62103b22-83d8-4aab-a28a-df0061c851b4'

  menuList: BusinessInformation[] = [];
  constructor(
    private generalAppService: GeneralAppService
  ){

    this.generalAppService.getBusinessActive().subscribe({
      next:(menusData: BusinessInformation[])=>{
        console.log(menusData)
        menusData.forEach(menu=>{
          if(menu.urlImgRestaurante){
            this.menuList.push(menu)
          }
        })
        
      }
    })
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  



}
