import { Component, input, Input, OnInit, Signal } from '@angular/core';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MatCardModule,  } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GeneralAppService } from '../../../shared/services/general-app.service';
import { Product } from '../../../shared/interfaces/product';
import { Categories } from '../../../shared/interfaces/categories';
import {MatChipsModule} from '@angular/material/chips';
import { DemoService } from '../../../shared/services/demo.service';

@Component({
  selector: 'app-card-menus',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    
    
  ],
  templateUrl: './card-menus.component.html',
  styleUrl: './card-menus.component.scss'
})
export class CardMenusComponent implements OnInit {


  
  menu = input<Partial<BusinessInformation & {categorySelected?: string, productsSelected: Product[]}>>();
  urlNoImage:string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fdemo-app%2Ficons-web%2Ficons8-meal-100.png?alt=media&token=fa6c357b-e550-41cb-b9f6-90cca55f014f'

  constructor(
    private generalAppService : GeneralAppService,
    private router :Router,
    private demoService : DemoService,
  ){
   
    
    
  }
  ngOnInit(): void {

   
  
    this.getProducts()
    console.log('menu', this.menu())
  }

  setIdBu(){
    this.demoService.setIdBusiness(this.menu()?.id!)
  }


  getProducts() {
    const menuId = this.menu()?.id;
  if (menuId) {
    this.generalAppService.getProductList(menuId).subscribe(products => {
      const currentMenu = this.menu();
      if (currentMenu) {
        currentMenu.products = products;
        currentMenu.productsSelected = products
        console.log('Updated menu with products:', currentMenu);
      } else {
        console.log('Menu is undefined, cannot update products');
      }
    });

    this.generalAppService.getCategories(menuId).subscribe((categories: Categories[])=>{
      const currentMenu = this.menu();
      if(currentMenu){
        currentMenu.categories = categories.sort((a,b)=> a.position! - b.position!)
        currentMenu.categorySelected = categories[0].id
        currentMenu.productsSelected = currentMenu.products?.filter(pro=> pro.idSection === currentMenu.categorySelected)
      }
    })
  } else {
    console.log('Menu ID is undefined');
  }
  }

  

  routerLinkMenu(idBusiness:string, idMenu:string){
    console.log(`${idMenu}/${idBusiness}`)
    console.log('menu')
    if(idMenu == undefined){
     this.router.navigateByUrl(`menu-demo-layout-01/${idBusiness}`)
    }else{
      
     this.router.navigateByUrl(`${idMenu}/${idBusiness}`)
    }


    this.router.navigateByUrl(`menus/${idBusiness}`)
    
     
   }

   selectedProduct(idCategory:string){

    const currentMenu = this.menu();

    if(currentMenu){
      currentMenu.categorySelected = idCategory
      currentMenu.productsSelected = currentMenu.products?.filter(pro=> pro.idSection === idCategory)
    }

   }

   routerLinkEditMenu(id: string){
    this.setIdBu()
    this.router.navigateByUrl(`/app-samari/control/${id}`)

   }

}
