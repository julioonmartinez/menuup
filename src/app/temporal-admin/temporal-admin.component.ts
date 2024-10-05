import { Component } from '@angular/core';
import { Categories } from '../shared/interfaces/categories';
import { Product } from '../shared/interfaces/product';
import { RestaurantService } from '../shared/services/restaurant.service';
import { MatListModule } from '@angular/material/list';
import { MenuService } from '../shared/services/menu.service';
import { DemoService } from '../shared/services/demo.service';

@Component({
  selector: 'app-temporal-admin',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './temporal-admin.component.html',
  styleUrl: './temporal-admin.component.scss'
})
export class TemporalAdminComponent {

  categories : Categories[] = [];
  categoriesDB : Categories[] = [];
  products: Product[] = [];
  idMenu: string = 'DeYsGSv8cbzaTgVmyJm7'
  constructor(
    private service : RestaurantService,
    private menuService : DemoService
  ){

    this.categories = this.service.gesListSectionRestauntat()
    console.log(this.categories)
    this.products = this.service.getListPlatillos()
    this.menuService.getCategoryList(this.idMenu).subscribe(data=>{
      this.categoriesDB = data
     
    })
  }

  async saveCategory(){
    this.categories.forEach( (cat, i)=>{
      const newCat: Categories = {
        name: cat.name,
        position: i + 1,
        urlImage: cat.urlImage,
        useIcons: false,
      }
      this.menuService.addCategory(this.idMenu, newCat)
    })
    }

    
    savePRoduct(){

      this.products.forEach(product=>{
        const newProcuct : Product = {
          name: product.name,
          status: product.status,
          idSection: product.idSection,
          price: product.price,
          urlImage: product.urlImage,
          description: product.description,
          subtitle:product.subtitle,
        }
        this.menuService.addProduct(this.idMenu, product)
      })
      
      
    }
    generatedb(){
      this.products.forEach(product=>{
        const idCategory = product.idSection
        const categoriesFInd = this.categories.find(cat=> cat.id == idCategory)
        if(categoriesFInd){
          const idCategoryDB = this.categoriesDB.find(cat=> cat.name === categoriesFInd.name)
          if(idCategoryDB){
            product.idSection = idCategoryDB.id
         
          }else{
            console.log('No hay category db')
          }
         
        }else{
          console.log(' no hay categrys find')
        }
      })
    }

}
