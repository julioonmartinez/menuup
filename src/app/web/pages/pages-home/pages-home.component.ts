import { Component, OnInit} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralAppService } from '../../../shared/services/general-app.service';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CardMenusPublicComponent } from '../../components/card-menu-public/card-menu-public.component';

@Component({
  selector: 'app-pages-home',
  standalone: true,
  imports:  [CardMenusPublicComponent, RouterLinkActive, RouterLink, MatButtonModule, MatProgressSpinnerModule , CommonModule, MatIconModule, MatCardModule],
  templateUrl: './pages-home.component.html',
  styleUrls: ['./pages-home.component.scss'],
})
export class PagesHomeComponent implements OnInit {
  urlNoImage:string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fdemo-app%2Ficons%2Ficons8-no-image-50.png?alt=media&token=2be44557-f633-4788-a275-841659865aae'
 
  bussinesList : Partial<BusinessInformation & {categorySelected?: string, productsSelected: Product[]}>[] = []
  constructor(
    private generalAppService : GeneralAppService,
    private router : Router
  ) {}

  ngOnInit(): void {
   this.getBussiness();
  }

  getBussiness(){
    this.generalAppService.getBusinessActive().subscribe({
      next:(data)=>{
        this.bussinesList = data
        this.bussinesList.forEach(bu=>{
          if(bu.id){
            this.generalAppService.getProductList(bu.id).subscribe(datas=>{
              bu.products = datas
              // bu.products = bu.products?.slice(0,5)
            })
            this.generalAppService.getCategories(bu.id).subscribe(datas=>{
              bu.categories = datas
              bu.categories = bu.categories?.sort((a,b)=> a.position! - b.position!)
              bu.categorySelected = bu.categories?.[0].id
              bu.productsSelected = bu.products?.filter(pro=> pro.idSection === bu.categorySelected )
              
            })
          }
        })

        // this.bussinesList = this.bussinesList.filter(bu=> bu.idUSer == undefined)
      }
     }) 
  }

  

  routerLinkMenu(idBusiness:string, idMenu:string){
   if(idMenu == undefined){
    this.router.navigateByUrl(`menu-demo-layout-01/${idBusiness}`)
   }else{
    this.router.navigateByUrl(`${idMenu}/${idBusiness}`)
   }
    
  }

  selectedproduct(idBu:string, idCategory:string){
    const business = this.bussinesList.find(bu=> bu.id == idBu)
    if(business){
      business.categorySelected = idCategory
      business.productsSelected = business.products?.filter(pro=> pro.idSection == business.categorySelected)
    }

  }

 

  

  
}
