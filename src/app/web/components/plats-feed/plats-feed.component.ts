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
  urlNoImage:string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fdemo-app%2Ficons-web%2Ficons8-meal-100.png?alt=media&token=fa6c357b-e550-41cb-b9f6-90cca55f014f'

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
