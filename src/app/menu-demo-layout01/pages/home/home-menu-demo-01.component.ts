import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categories } from '../../../shared/interfaces/categories';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MenuService } from '../../../shared/services/menu.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports:  [CommonModule, MatToolbarModule, MatCardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
  
})
export class HomeComponent01 implements OnInit {

  public sectionRestarunts: Categories[] =[];
  public idBusiness:string = '';
  public business: BusinessInformation | undefined = undefined
  public imageHeader: string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Flayout-01%2F_3efa4ee2-4e9b-4795-89c2-e22868e401b2.jpeg?alt=media&token=381d562d-b890-40d7-98f4-9efde079533d'
  public imagePlatillo:string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Flayout-01%2F_1c01ca8b-bf7a-45bb-87c1-4d0a29e92a03.jpeg?alt=media&token=297e0207-d99d-48b7-9ab2-899673b801c5'
  
  constructor(

    private router : Router,
    private menuService : MenuService,
    private cdr: ChangeDetectorRef
    
  ){}
  ngOnInit(): void {
  
    this.idBusiness =  this.menuService.getBusinessId()
    this.getCategoriesList();
    this.getBussiness()
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

  async getCategoriesList(){
    this.menuService.getCategoriesLIst(this.idBusiness).subscribe(data=>{
      console.log('menu-home', data)
       this.sectionRestarunts = data
       this.sectionRestarunts = this.sectionRestarunts.sort((a,b)=> a.position! - b.position!)
      this.cdr.detectChanges()
    }
    )
    // this.menuDemoService.getCategoriesList02(this.idBusiness)
  }

  getBussiness(){

    this.menuService.bussinesData$.subscribe(data=>{
      if(data){
        this.business = data
      }
    })
    // this.menuDemoService.getBusinessDB(this.idBusiness).subscribe(data=>{
    //   this.business = data
    //   console.log( 'data-bu-home', this.business)
      
    // })

    
  }

}
