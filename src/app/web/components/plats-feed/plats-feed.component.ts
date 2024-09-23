import { Component } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { GeneralAppService } from '../../../shared/services/general-app.service';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-plats-feed',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatButtonModule],
  templateUrl: './plats-feed.component.html',
  styleUrl: './plats-feed.component.scss'
})
export class PlatsFeedComponent {

  productList:Product[] = [];

  constructor(
    private generalApp : GeneralAppService,
  ){

    this.getProductList()
  }



  getProductList(){
    this.generalApp.getProductListByFeed().subscribe(list=>{
      console.log( 'productsrandoms', list as Product[])

      this.productList = list
    })
  }

}
