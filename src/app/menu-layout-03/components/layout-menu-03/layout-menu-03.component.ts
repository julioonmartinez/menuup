import { Component, ElementRef, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MenuService } from '../../../shared/services/menu.service';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Categories } from '../../../shared/interfaces/categories';
import { Product } from '../../../shared/interfaces/product';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetCodeQrComponent } from '../bottom-sheet-code-qr/bottom-sheet-code-qr.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SurveyButtonComponent } from "../../../shared/components/survey-button/survey-button.component";
import { MatDialog } from '@angular/material/dialog';
import { DialogSurveyComponent } from '../../../shared/components/dialog-survey/dialog-survey.component';
import { ButtonCreateMenuComponent } from '../../../shared/components/button-create-menu/button-create-menu.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-layout-menu-03',
  standalone: true,
  imports: [MatCardModule, ButtonCreateMenuComponent, RouterLink, MatProgressSpinnerModule, MatBottomSheetModule, MatButtonModule, MatIconModule, RouterOutlet, MatToolbarModule, CommonModule, SurveyButtonComponent],
  templateUrl: './layout-menu-03.component.html',
  styleUrl: './layout-menu-03.component.scss'
})
export class LayoutMenu03Component {
  menu : BusinessInformation | undefined = undefined;
  categories:Categories  []= []
  categorySelected: string = '';
  products : Product[] = []
  noImage: string = ''
  private _bottomSheet = inject(MatBottomSheet);
  private dialog = inject(MatDialog)
  constructor(
    private activatedRoute: ActivatedRoute,
    private menuService : MenuService,
    
  ){
    this.activatedRoute.paramMap.subscribe(params=>{
      const idMenu = params.get('idCompany')
     if(idMenu){
      this.menuService.getBusinessDB(idMenu).subscribe({
        next:(dataMenu)=>{
         setTimeout(()=>{
          this.menu = dataMenu
         }, 500)
          // this.menu.nivel = 'premium'

        }
       
      });
       //Ahora Categorias
       this.menuService.getCategoriesLIst(idMenu).subscribe({
        next:(cats)=>{
          this.categories = cats
          this.categories = this.categories.sort((a,b)=> a?.position! - b?.position!)
          this.categorySelected = this.categories[0]?.id!
          
        }
       });
       // ahora los productos
       this.menuService.getProducts(idMenu).subscribe({
        next:(dataProducts)=>{
          this.products = dataProducts
        }
       })
     }

      

    
    })

  }

  openDialogSurvey(){
    this.dialog.open(DialogSurveyComponent, {
      data: this.menu
    }).afterClosed().subscribe(result=>{
      result
    })
  }


  openBottonSheetCodeQR(){
    this._bottomSheet.open(BottomSheetCodeQrComponent,
      {
        data:this.menu,
        panelClass:'container-botton-sheet',
      }
    ).afterDismissed().subscribe(result=>{
      
    })
  }

 


  filterProducs(idCategory:string){
    return this.products.filter(product=> product.idSection === idCategory)

  }

  scrollToCategory(categoryId: string): void {
    this.categorySelected = categoryId
    const element = document.getElementById(`category-${categoryId}`);
    const toolbarHeight = document.querySelector('.container-toolbar')?.clientHeight || 0; // Altura del toolbar
    const productHeight = document.getElementById(`container-product-${categoryId}`)?.clientHeight || 0; 
    const categoriesHeight = document.querySelector('.container-list-cagories')?.clientHeight || 0; // Altura de las categorías
    console.log('hi', productHeight)
  
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (toolbarHeight + categoriesHeight ) + productHeight;
  
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
