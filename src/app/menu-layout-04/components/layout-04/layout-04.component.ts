import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../../shared/services/menu.service';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ButtonCreateMenuComponent } from '../../../shared/components/button-create-menu/button-create-menu.component';
import { Categories } from '../../../shared/interfaces/categories';
import { Product } from '../../../shared/interfaces/product';
import { Promos } from '../../../shared/interfaces/promos';

@Component({
  selector: 'app-layout-04',
  standalone: true,
  imports: [ButtonCreateMenuComponent, CommonModule, MatProgressSpinnerModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './layout-04.component.html',
  styleUrl: './layout-04.component.scss'
})
export class Layout04Component {

  private menuService = inject(MenuService);

  public menu : BusinessInformation | null = null ;
  public catgories : Categories[] = [];
  public categorySelected : string = '';
  public products: Product[] = [];
  public promos: Promos[] = [
    {
      id:'',
    idBussines:'',
    nameBusiness:'Ameyali',
    urlImage:'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fpromo-prueba%2FGemini_Generated_Image_hkm4nehkm4nehkm4.jpeg?alt=media&token=39d713f3-e447-4982-b62e-060c51ebfa20',
    title:'Pizzas al 30% de descuento',
    subtitle:'Martes de pizzas en descuento',
    description: 'Todos los martes 30% de descuento en nuestras mejores pizzas',
    conditions:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores modi optio cumque, hic animi laudantium consectetur reprehenderit rerum quia minus dolor aut illo praesentium consequatur laboriosam blanditiis quidem temporibus!',
    promotionPeriod: new Date(),
    },
    {
      id:'',
    idBussines:'',
    nameBusiness:'Tacos Santitos',
    urlImage:'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fpromo-prueba%2FGemini_Generated_Image_uaiq6duaiq6duaiq.jpeg?alt=media&token=4768a3e0-7448-4814-9357-9d0c6663328f',
    title:'Orden de tacos a $30',
    subtitle:'Martes de pizzas en descuento',
    description: 'Todos los Lunes la orden de 5 tacos en 50 pesos' ,
    conditions:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores modi optio cumque, hic animi laudantium consectetur reprehenderit rerum quia minus dolor aut illo praesentium consequatur laboriosam blanditiis quidem temporibus!',
    promotionPeriod: new Date(),
    },
    {
      id:'',
    idBussines:'',
    nameBusiness:'Barraco',
    urlImage:'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fpromo-prueba%2FGemini_Generated_Image_hkm4nehkm4nehkm4.jpeg?alt=media&token=39d713f3-e447-4982-b62e-060c51ebfa20',
    title:'2 x 1 en Gin tonic',
    subtitle:'Martes de pizzas en descuento',
    description:'Martes de chicas',
    conditions:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores modi optio cumque, hic animi laudantium consectetur reprehenderit rerum quia minus dolor aut illo praesentium consequatur laboriosam blanditiis quidem temporibus!',
    promotionPeriod: new Date(),
    }
  ];
  
  
  constructor(
    private activatedRoute : ActivatedRoute
  ){

    this.activatedRoute.paramMap.subscribe(params=>{

      const idMenu = params.get('idCompany')
      console.log(idMenu)

      if(idMenu){
        this.menuService.getBusinessDB(idMenu).subscribe(dataMenu=>{
          this.menu = dataMenu
          console.log(this.menu)
        });
        this.menuService.getCategoriesLIst(idMenu).subscribe(dataCategories=>{
          this.catgories = dataCategories
          this.categorySelected = this.catgories[0].id!
          console.log(this.categorySelected)
        });
        this.menuService.getProducts(idMenu).subscribe(productData=>{
          this.products = productData
        })
      }
     
    })
  }

  onSelectedCategory(idCategory:string){
    this.categorySelected = idCategory
  }

  getProductByCategory(idCategory:string){
    return this.products.filter(produc=> produc.idSection == idCategory)
  }

  scrollToCategory(categoryId: string): void {
    this.categorySelected = categoryId
    const element = document.getElementById(`category-${categoryId}`);
    const toolbarHeight = document.querySelector('.content-toolbar')?.clientHeight || 0; // Altura del toolbar
    const productHeight = document.getElementById(`container-product-${categoryId}`)?.clientHeight || 0; 
    const categoriesHeight = document.querySelector('.container-list-cagories')?.clientHeight || 0; // Altura de las categorías
    console.log('hi', productHeight)
  
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (toolbarHeight + categoriesHeight );
  
      // Comprobamos si el nuevo desplazamiento está fuera de los límites de la página
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const finalScroll = Math.min(offsetPosition, maxScroll); // Ajusta el scroll si está cerca del final
  
      window.scrollTo({
        top: finalScroll,
        behavior: 'smooth',
      });
    }
  }



}
