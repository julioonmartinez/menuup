import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

import {MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { CapitalizeFirstPipe } from '../../../shared/pipes/capitalize-first.pipe';
import { Categories } from '../../../shared/interfaces/categories';
import { Product } from '../../../shared/interfaces/product';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MenuService } from '../../../shared/services/menu.service';



@Component({
  selector: 'app-section',
  standalone: true,
  imports: [MatCardModule, RouterModule, CommonModule, CapitalizeFirstPipe, RouterLink],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  
})
export class SectionComponent implements OnInit {
  public category: Categories | undefined = undefined;
  public productsList: Product[] = [];
  public idBusiness : string = '';
  public business: BusinessInformation | null = null;
  public imagePlatillo:string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Flayout-01%2F_1c01ca8b-bf7a-45bb-87c1-4d0a29e92a03.jpeg?alt=media&token=297e0207-d99d-48b7-9ab2-899673b801c5'
  public noImage = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Flayout-01%2F_c17a66a3-116e-4b97-a4a4-6ecfcd0b73cd.jpeg?alt=media&token=c77cfef9-738a-4c5b-ba1b-584265268c5e'
  constructor(
    private activatedRoute: ActivatedRoute,

    private route : Router,
    private menuDemoService : MenuService,
    private cdr: ChangeDetectorRef,
  ){}
  ngOnInit(): void {
   this.idBusiness = this.menuDemoService.getBusinessId()

   this.menuDemoService.bussinesData$.subscribe(data=>{
    this.business = data
   })
   

    this.activatedRoute.paramMap.subscribe( async params=>{
      const idSection = await params.get('id')

      if(idSection){
      
        this.menuDemoService.getProducts(this.idBusiness).subscribe({
          next:(data:Product[])=>{
            console.log(data)
            this.productsList = data
            this.productsList = this.productsList.filter(product=>product.idSection == idSection)
            this.cdr.detectChanges()
          },
          error:()=>{
            console.log('error al cargar la lista de productos')
          }
           
        })

        this.menuDemoService.getCategoryDB(this.idBusiness, idSection).subscribe({
          next:(data:Categories)=>{
            this.category = data
            this.cdr.detectChanges()
          },
          error:(error)=>{
            console.error(error)
          }
        })
      }

      
      
    })
  }
  routerLink(plat:Product){
    console.log('link', `menus/${this.business?.id}/menu-demo-layout-01/detail-platillo/${plat.id}`)
    this.route.navigateByUrl(`/menu-demo-layout-01/${this.business?.id}/detail-platillo/${plat.id}`)
  }

  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;  
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
  
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  }
}
