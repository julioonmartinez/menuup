import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MenuService } from '../../../shared/services/menu.service';
import { Categories } from '../../../shared/interfaces/categories';
import { Icon } from '../../../shared/interfaces/icon';
import { ICONS } from '../../../shared/enums/icon';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { SurveyButtonComponent } from "../../../shared/components/survey-button/survey-button.component";
import { DialogSurveyComponent } from '../../../shared/components/dialog-survey/dialog-survey.component';
import { ButtonCreateMenuComponent } from '../../../shared/components/button-create-menu/button-create-menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../../shared/interfaces/product';
import { DetailProductComponent } from '../../pages/detail-product/detail-product.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatProgressSpinnerModule, ButtonCreateMenuComponent, MatDialogModule, SurveyButtonComponent, MatBottomSheetModule, RouterLink, RouterLinkActive, CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, SurveyButtonComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent02 {
  icons: Icon[] = ICONS

  listCategories: Categories[] = [
    // {name:'Hamburguesas', idIcons:'A01', id:'158' },
    // {name:'Hamburguesas', idIcons:'A01', id:'58999' },
    // {name:'Hamburguesas', idIcons:'A01', id:'5899955' },
    // {name:'Hamburguesas', idIcons:'A01', id:'5899955asd' },
    // {name:'Hamburguesas', idIcons:'A01', id:'58999asd55' },
    
  ]
  business!: BusinessInformation;
  loading : boolean = true;

  categorySelect: string = '';

  private _bottomSheet = inject(MatBottomSheet);
  products:  Product[] = [];


  constructor(
    private activatedRouter : ActivatedRoute,
    private menuService : MenuService,
    private router : Router,
    private sheet : MatBottomSheet,
    private dialog : MatDialog,
  ){
    // this.menuService.bussinesData$.subscribe(data=>{
    //   if(data){
    //     console.log('layout02', data)
    //     this.business = data
    //     this.menuService.getCategoriesLIst(this.business.id!).subscribe(list=>{
    //               this.listCategories = list.sort((a,b)=> a.position! - b.position!)
    //               console.log(this.listCategories)
    //               this.router.navigateByUrl(`/menus/${this.business.id}/${this.business.idMenu}/home/${this.listCategories[0].id}`)
    //             })

    //   }
    // })

    
  this.activatedRouter.paramMap.subscribe(params=>{
    const idCompany = params.get('idCompany')
    if(idCompany){
      this.menuService.setBusinessId(idCompany)
      this.menuService.getBusinessDB(idCompany).subscribe(data=>{
        this.business = data
        this.menuService.getCategoriesLIst(this.business.id!).subscribe(list=>{
          this.listCategories = list.sort((a,b)=> a.position! - b.position!)
          this.categorySelect = this.listCategories[0].id!
          console.log(this.categorySelect);
          this.menuService.getProductbyCategory(idCompany, this.categorySelect).subscribe(productList=>{
            this.products = productList;
            this.loading = false;
          })

        });

        
        
      })
    }
  })

   

   
    

  }

  openDialogSurvey(){
    this.dialog.open(DialogSurveyComponent, {
      data: this.business
    }).afterClosed().subscribe(result=>{
      result
    })
  }

  searchIcon(idIcon:string){
    const searchIcon = this.icons.find(ii=> ii.id == idIcon)
   if(searchIcon){
    return searchIcon.url
   }else{
    let noImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9UlEQVR4nO3av0rDUBTH8a8iBR8gQV1duwtO4uDm4OzgIzg4uLpZR8EHcHBzc3bSQdBOVuggONk6dRAsCoJHAmco7W1vbnKT3EB/ENomoemn5/5J0sI84eYOaAMxNc8jIECn7pgIeFZMF1ilxonmmIAyBLYNlQl9mYjUFDMR04aQ+4y4QELGiCskVIxkgYSIkayQ0DCSBxISRvJC0HOxjqdzswZwBvSBHtDSdaVAfGJahrmhVSbEVzPrGyAfZUN8YHoGyHvZkCUPzczUtE7LhDSBV2ArJ6ahmKQypXf2DWCg+98UNJoVDkkq8DmCWK5onpE8kF3gW/e7GukjVICRrJB94Ff3uQAWLQcqGiNZIIfAn24/cThYmj4T622oJ8c+5Qw51vUJ5Aj3zKrM+FVo16FyqSELwLmuS5rUAdljqsz4OtfRLhUk6cSX+voH2MuBmIaxweK8kGQyutbnX8AO/mJqSitTtnctzcwKudXHgU58vmP75uOUlbFCRM9ImwUANj1ixAZ5A9YLQHS0qfrCiA2yhv+09b1fxj5QHoz4vh5Jk/sZE15WjFQBscU2WkWG7UFCslRGQoUkcalM0JAsmGAhaZtZLSBpKpNqZq9yGTr+2BQsRBwxtUoUyI1zL4nmmEATjwzNyd9Oap1Yz6gfqv4g8zAl/0R5DjHsGdTIAAAAAElFTkSuQmCC'
    return noImage
   }
  }
  searchIconSelected(idIcon:string){
    const searchIcon = this.icons.find(ii=> ii.id == idIcon)
   if(searchIcon){
    return searchIcon.urlSelected
   }else{
    let noImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9UlEQVR4nO3av0rDUBTH8a8iBR8gQV1duwtO4uDm4OzgIzg4uLpZR8EHcHBzc3bSQdBOVuggONk6dRAsCoJHAmco7W1vbnKT3EB/ENomoemn5/5J0sI84eYOaAMxNc8jIECn7pgIeFZMF1ilxonmmIAyBLYNlQl9mYjUFDMR04aQ+4y4QELGiCskVIxkgYSIkayQ0DCSBxISRvJC0HOxjqdzswZwBvSBHtDSdaVAfGJahrmhVSbEVzPrGyAfZUN8YHoGyHvZkCUPzczUtE7LhDSBV2ArJ6ahmKQypXf2DWCg+98UNJoVDkkq8DmCWK5onpE8kF3gW/e7GukjVICRrJB94Ff3uQAWLQcqGiNZIIfAn24/cThYmj4T622oJ8c+5Qw51vUJ5Aj3zKrM+FVo16FyqSELwLmuS5rUAdljqsz4OtfRLhUk6cSX+voH2MuBmIaxweK8kGQyutbnX8AO/mJqSitTtnctzcwKudXHgU58vmP75uOUlbFCRM9ImwUANj1ixAZ5A9YLQHS0qfrCiA2yhv+09b1fxj5QHoz4vh5Jk/sZE15WjFQBscU2WkWG7UFCslRGQoUkcalM0JAsmGAhaZtZLSBpKpNqZq9yGTr+2BQsRBwxtUoUyI1zL4nmmEATjwzNyd9Oap1Yz6gfqv4g8zAl/0R5DjHsGdTIAAAAAElFTkSuQmCC'
    return noImage
   }

  }

  setIDCategorySelected(id:string){
    this.categorySelect = id;
    this.menuService.getProductbyCategory(this.business.id!, this.categorySelect).subscribe(productList=>{
      this.products = productList;
      this.loading = false;
    })

    

  }

  openDialogInfo(){
    this.sheet.open(DialogInfoComponent,{
      data:{
        company:this.business
      }
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
