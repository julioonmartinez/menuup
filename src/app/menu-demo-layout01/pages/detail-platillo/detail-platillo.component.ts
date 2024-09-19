import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CapitalizeFirstPipe } from '../../../shared/pipes/capitalize-first.pipe';
import { MenuService } from '../../../shared/services/menu.service';
import { Product } from '../../../shared/interfaces/product';
import { BusinessInformation } from '../../../shared/interfaces/business-information';


@Component({
  selector: 'app-detail-platillo',
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe],
  templateUrl: './detail-platillo.component.html',
  styleUrl: './detail-platillo.component.scss'
})
export class DetailPlatilloComponent implements OnInit {

  public product!: Product;
  public idBusiness: string = '';
  public noImage = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Flayout-01%2F_c17a66a3-116e-4b97-a4a4-6ecfcd0b73cd.jpeg?alt=media&token=c77cfef9-738a-4c5b-ba1b-584265268c5e'
  public business: BusinessInformation | null = null;

  constructor( 

    private activatedRouter : ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private menuService : MenuService,
  ){
    this.idBusiness = menuService.getBusinessId()
    this.menuService.getBusinessDB(this.idBusiness).subscribe(data=>{
      console.log('data444', data)
      this.business = data
    })

  }
  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(params =>{
      const idPlatillo = params.get('id');
      console.log('id', idPlatillo)
     if(idPlatillo){
      
      this.menuService.getProducts(this.idBusiness).subscribe({
        next:(products:Product[])=>{
          const platSearch = products.find(product=> product.id === idPlatillo);
          if(platSearch){
            this.product = platSearch;
            this.cdr.detectChanges()
          }

        }
      })
     }
     

      
      
    })
    
    
  }
  

}
