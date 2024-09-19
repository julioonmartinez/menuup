import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { MenuService } from '../../../shared/services/menu.service';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatBottomSheetModule, RouterLink, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent02 {
  private _bottomSheet = inject(MatBottomSheet);

  idCompany: string | null = null
  products:  Product[] = [];
  constructor(
    private menuService : MenuService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){
    this.idCompany = menuService.getBusinessId()
    console.log(this.idCompany)

    this.activatedRoute.params.subscribe(params=>{
      const idCategory = params['idCategory']
      console.log(idCategory)
    
      if(idCategory){
        this.menuService.getProductbyCategory(this.idCompany!, idCategory).subscribe(productList=>{
          this.products = productList
        })
      }else{
        // this.menuService.getCategoriesLIst(this.idCompany!).subscribe(data=>{
          
        //   const dataList =  data.sort((a,b)=> a.position! - b.position!)
        //   const idFirsCategory =  dataList[0].id
        //   console.log('first', idFirsCategory)
        //   this.router.navigateByUrl(`menu-layout-02/${this.idCompany}/home/${idFirsCategory}`)
        //   console.log('redirect', `menu-layout-02/${this.idCompany}/home/${idFirsCategory}`)
        // })
      }
    })

    menuService.getBusinessDB(this.idCompany).subscribe(data=>{
      console.log(data)
    })
  }


  openBottomSheet(product: Product): void {
    this._bottomSheet.open(DetailProductComponent, {
      data:{
        product: product
      }
    });
  }

}
