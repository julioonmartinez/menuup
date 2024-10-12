import { Component, inject, HostListener } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogSurveyComponent } from '../../../shared/components/dialog-survey/dialog-survey.component';
import { DialogInfoComponent } from '../../../menu-layout-02/components/dialog-info/dialog-info.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';




@Component({
  selector: 'app-layout-04',
  standalone: true,
  imports: [MatBottomSheetModule, MatDialogModule, ButtonCreateMenuComponent, CommonModule, MatProgressSpinnerModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './layout-04.component.html',
  styleUrl: './layout-04.component.scss',
 
})
export class Layout04Component {
  private menuService = inject(MenuService);
  private _bottomSheet = inject(MatBottomSheet);
  private _matDialog = inject(MatDialog);
  public menu : BusinessInformation | null = null;
  public catgories : Categories[] = [];
  public categorySelected : string = '';
  public products: Product[] = [];
  scrollActive = true;

  constructor(private activatedRoute : ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      const idMenu = params.get('idCompany');
      if (idMenu) {
        this.menuService.getBusinessDB(idMenu).subscribe(dataMenu => {
          this.menu = dataMenu;
        });
        this.menuService.getCategoriesLIst(idMenu).subscribe(dataCategories => {
          this.catgories = dataCategories;
          this.catgories = this.catgories.sort((a,b)=> a.position! -b.position!)
          this.categorySelected = this.catgories[0].id!;
        });
        this.menuService.getProducts(idMenu).subscribe(productData => {
          this.products = productData;
        });
      }
    });
  };

  scrollCategoryIntoView(idCategory:string): void {
    const container = document.querySelector('.container-list-categories');
    const activeCategoryElement = document.getElementById(`category-scroll-${idCategory}`);
  
    if (container && activeCategoryElement) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeCategoryElement.getBoundingClientRect();
      
      // Calcular el desplazamiento manualmente
      const offset = activeRect.left - containerRect.left - 24; // Ajusta el 12px a tu necesidad
      
      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: 'smooth' // Movimiento suave
      });
    }
  }
  
 
  onSelectedCategory(idCategory: string): void {
    // Desactivar la lógica de scroll temporalmente
    this.scrollActive = false;
    
    this.categorySelected = idCategory;
    
    // // Forzar la activación de la clase .active en la categoría seleccionada manualmente
    // setTimeout(() => {
    //   this.categorySelected = idCategory;
      
    //   // Reactivar la lógica de scroll después de un retraso para evitar conflictos
    //   setTimeout(() => {
    //     this.scrollActive = true;
    //   }, 500); // Ajusta el tiempo si es necesario
    // }, 0);
  }

  getProductByCategory(idCategory: string) {
    return this.products.filter(product => product.idSection === idCategory);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkCategoryPosition();
  }


  scrollToCategory(categoryId: string): void {
    // this.categorySelected = categoryId
    this.scrollActive = false;
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
      });;
      this.categorySelected = categoryId;
      this.scrollCategoryIntoView(categoryId);
      setTimeout(()=>{
        this.scrollActive = true;
      }, 500)
    }
  }

  openDialogSurvey(){
    this._matDialog.open(DialogSurveyComponent,{
      data:this.menu
    })
  };
  
  openDialogInfo(){
    this._bottomSheet.open(DialogInfoComponent,{
      data:{
        company:this.menu
      }
    })
  }

  checkCategoryPosition(): void {
    if (!this.scrollActive) return; // Si el scroll está deshabilitado, no hacer nada
  
    const container = document.querySelector('.container-list-categories');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const margin = 20;
      
      this.catgories.forEach(category => {
        const element = document.getElementById(`category-${category.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const expectedPosition = containerRect.bottom + 8;
  
          // Detectar si el título de la categoría está dentro del margen especificado
          if (Math.abs(rect.top - expectedPosition) <= margin) {
            this.categorySelected = category.id!;
            this.scrollCategoryIntoView(category.id!);
          }
        }
      });
    }
  };

  

  // scrollToCategory(categoryId: string): void {
  //   this.categorySelected = categoryId;
  //   const element = document.getElementById(`category-${categoryId}`);
  //   const toolbarHeight = document.querySelector('.content-toolbar')?.clientHeight || 0; 
  //   const categoriesHeight = document.querySelector('.container-list-categories')?.clientHeight || 0; 

  //   if (element) {
  //     const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  //     const offsetPosition = elementPosition - (toolbarHeight + categoriesHeight);
  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth',
  //     });
  //   }
  // }

  // @HostListener('window:scroll', [])
  // onWindowScroll(): void {
  //   let currentCategory = '';

  //   for (let category of this.catgories) {
  //     const element = document.getElementById(`category-${category.id}`);
  //     if (element) {
  //       const rect = element.getBoundingClientRect();
  //       if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
  //         currentCategory = category.id!;
  //         break;
  //       }
  //     }
  //   }

  //   if (currentCategory && this.categorySelected !== currentCategory) {
  //     this.categorySelected = currentCategory;
  //   }
  // }
}

