import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogEditBusinessComponent } from '../../../shared/components/dialog-edit-business/dialog-edit-business.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogAddCategoryComponent } from '../../../shared/components/dialog-add-category/dialog-add-category.component';
import { DialogAddProductComponent } from '../../../shared/components/dialog-add-product/dialog-add-product.component';
import { DemoService } from '../../../shared/services/demo.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogDeleteCategoryComponent } from '../../../shared/components/dialog-delete-category/dialog-delete-category.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { DialogDeleteBusinessComponent } from '../../../shared/components/dialog-delete-business/dialog-delete-business.component';
import { Categories } from '../../../shared/interfaces/categories';
import { Product } from '../../../shared/interfaces/product';
import { Icon } from '../../../shared/interfaces/icon';
import { ICONS } from '../../../shared/enums/icon';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { DialogAddressEditComponent } from '../../components/dialogs/dialog-address-edit/dialog-address-edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CdkDropList,
     CdkDrag,
    ReactiveFormsModule,
     MatFormFieldModule, 
     MatProgressSpinnerModule,
    MatSnackBarModule,
     MatInputModule,
     MatIconModule,
     CommonModule,
    MatListModule,
    MatSlideToggleModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatProgressBarModule,
    RouterModule,
  
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private _bottomSheet = inject(MatBottomSheet);

  @ViewChild(CdkDrag) drag!: CdkDrag;

  categoriesList: Array<{ statusPanel: boolean } & Categories> = [];
  productList: Product[] = [];
  statusPanelWithCategory = false
  progressBarProduct = ''
  spinnerPrincipal = false
  noImage = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fdemo-app%2Fimage_100dp_E8EAED_FILL0_wght400_GRAD0_opsz48%20(1).png?alt=media&token=4bf50080-9ea4-4dbc-9e21-ba1d0a50f4eb'
  maxFileSize = 5 * 1024 * 1024; // 2MB
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
  uploadProgress: number | null = null;
  imagePreviewUrl: string | null = null;
  currenUser : User | null = null;
  imageUrl: string | null = null;
  imagePath: string | null = null;

  isDrop: boolean = true;

  icons: Icon[] = ICONS; 

  public infoDemo:BusinessInformation = {
    nameCompany:''
  }


  constructor(
  
    private matDialog : MatDialog,
    private demoServive : DemoService,
    private _snackBar : MatSnackBar,
    private dragDrop: DragDrop,
    private authService : AuthService,
    private activsatedRouter : ActivatedRoute,
    private router : Router
  ){

  }
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(userData=>{
      this.currenUser = userData;
      this.activsatedRouter.paramMap.subscribe(params=>{
        const idParams = params.get('id');
        if(idParams){
          
          this.loadBussiness(idParams);
          
        }
      })
    })
    


    

  }

  searchIcons(idIcon:string){

    if(this.icons.find(icon=> icon.id == idIcon)?.url){
      return this.icons.find(icon=> icon.id == idIcon)?.url
    }else{
      //Icon no Image
      return this.icons.find(icon=> icon.id == 'A14')?.url
    }
    
  }

  openDialogAddress(){
  this.matDialog.open(DialogAddressEditComponent, {
    data: this.infoDemo
  }).afterClosed().subscribe(result=>{
    // console.log( 'desde', result)
    this.demoServive.updateBussiness(this.infoDemo.id!, result)
  })

  }

  clickDrop(idCategory:string){
    const categoryy = this.categoriesList.find(cat=>cat.id = idCategory)
    if(categoryy){
      categoryy.statusPanel = false
    }
  }

  async drop(event: CdkDragDrop<string[]>) {
    this.collapseAllSubLists()
   
    console.log('Nuevo orden de categorías:', this.categoriesList);
    moveItemInArray(this.categoriesList, event.previousIndex, event.currentIndex);
    this.uploadProgress = 1
    await this.updateCategoryPositions();
    this.saveCategoryPosition()

  }

  collapseAllSubLists() {
    
      this.categoriesList.forEach(cat => cat.statusPanel = false);
      // Simular un pequeño retraso para asegurar que la UI se actualice
    
  
  }
  onMouseDown() {
    this.collapseAllSubLists();
  }

  async updateCategoryPositions() {
   
  this.categoriesList.forEach((category, index) => {
    // Asignamos el nuevo valor de 'position' basado en el índice del arreglo
    category.position = index + 1;
  });

  console.log('Posiciones actualizadas:', this.categoriesList);
  this.saveCategoryPosition();
}

saveCategoryPosition(){
  console.log('ya empezamos a guardar')
  try{
    this.categoriesList.forEach( async (cat, index)=>{
      const newPosition = index + 1
      this.demoServive.updatePositionCategory(this.infoDemo.id!, cat.id!, newPosition ).subscribe({
        next:()=>{},
        error:()=>{
          console.log('error al guardar posicion')
        },
        complete:()=>{}
      })
      this.uploadProgress = null
    })
    
  }catch{

  }
}



  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (!this.allowedFormats.includes(file.type)) {
        this.openSnackBar('Formato no soportado, por favor usa JPG o PNG.');
        return;
      }

      if (file.size > this.maxFileSize) {
        this.openSnackBar('Usa imágenes con un máximo de 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadProgress = null;
      this.demoServive.startUpload(file, this.infoDemo.id!, 'product').subscribe({
        next: (progressData) => {
          this.uploadProgress = progressData.progress;
          if (progressData.downloadURL && progressData.filePath) {
            this.imageUrl = progressData.downloadURL;
            this.imagePath = progressData.filePath;
            this.infoDemo.filePath = this.imagePath;
            this.infoDemo.urlImgRestaurante = this.imageUrl;
            this.demoServive.updateBussiness(this.infoDemo.id!, this.infoDemo)

           
          }
        },
        error: (error) => console.error('Upload failed:', error),
        complete: () => {
          this.uploadProgress = null;
        }
      });
    }
  }

changeImageRestaruante(event:any){
  const file: File = event.target.files[0];

    if (file) {
      if (!this.allowedFormats.includes(file.type)) {
        this.openSnackBar('Formato no soportado, por favor usa JPG o PNG.');
        return;
      }

      if (file.size > this.maxFileSize) {
        this.openSnackBar('Usa imágenes con un máximo de 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadProgress = null;
      this.demoServive.startUpload(file, this.infoDemo.id!, 'product').subscribe({
        next: async (progressData) => {
          this.uploadProgress = progressData.progress;
          if (progressData.downloadURL && progressData.filePath) {
            await this.demoServive.deleteFile(this.infoDemo.filePath!)
            this.imageUrl = progressData.downloadURL;
            this.imagePath = progressData.filePath;
            this.infoDemo.filePath = this.imagePath;
            this.infoDemo.urlImgRestaurante = this.imageUrl;
            this.demoServive.updateBussiness(this.infoDemo.id!, this.infoDemo)

           
          }
        },
        error: (error) => console.error('Upload failed:', error),
        complete: () => {
          this.uploadProgress = null;
        }
      });
    }

}
  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho', {
      duration: 5*1000
    })
  }

 

  async loadBussiness(idParams:string){
   if(idParams === 'demo'){
    if(this.currenUser){
      this.router.navigateByUrl('/user')
      return
    }else{
      const nameLocalStorageBussinessDemo =  this.demoServive.nameLocalStorageDemoBussiness
      const saveBussiness  =   localStorage.getItem(nameLocalStorageBussinessDemo)
    if(saveBussiness){
      const info: BusinessInformation = await JSON.parse(saveBussiness);
      this.demoServive.getBussiness(info.id!).subscribe({
        next: async (data: BusinessInformation)=>{
          
          if(data.idUSer && !this.currenUser){
            this.openDialogCompanyName('new',this.infoDemo)
          }else{
            this.infoDemo = data;
            if(this.infoDemo.id){
              
              await this.getListCategories(this.infoDemo.id);
              await this.getListProducts(this.infoDemo.id);
            }

          }
         
        },
        error:()=>{
          this.openDialogCompanyName('new', this.infoDemo)
        },
        complete:()=>{

        }
        
      })
      
      
      setTimeout(()=>{
        this.spinnerPrincipal = true
      },2000)
     
      console.log(this.productList)
       
    }else{
      this.openDialogCompanyName('new',this.infoDemo)
      
   
    }
      
    }
    
   }else if(idParams === 'new-menu'){
    
    if(this.infoDemo.id){
      console.log(this.infoDemo)
      this.openDialogCompanyName('new', this.infoDemo)
    }else{
      this.openDialogCompanyName('new', this.infoDemo)
    }
    

   }else{
    
    this.demoServive.getBussiness(idParams).subscribe({
      next: async (data: BusinessInformation)=>{
        this.infoDemo = data;
       if(this.infoDemo.id){
        await this.getListCategories(this.infoDemo.id);
        await this.getListProducts(this.infoDemo.id);
       }
        setTimeout(()=>{
          this.spinnerPrincipal = true
        },800)
       
      },
      error:()=>{
       this.openSnackBar('no se encontro el negocio')
      },
      complete:()=>{

      }
      
    })
    
    
    
   }
    
  }

  removePRoductWithoutCateogry(){
    this.productList.filter(product=> product.idSection == '').forEach(pop=>{
      this.demoServive.deleteProduct(this.infoDemo.id!, pop.id!)
    })
  }



  clearLocalStorage(){
    const nameLocalStorageBussinessDemo = this.demoServive.nameLocalStorageDemoBussiness;
    localStorage.removeItem(nameLocalStorageBussinessDemo)
  }

  async getListProducts(idBu:string){
    this.demoServive.getListProducts(idBu).subscribe(async data=>{
       this.productList = data;
       console.log(this.productList)
      
    })

  }

  trackByFn(index: number, item: any): any {
    return item.position; // O cualquier propiedad única del item
  }


 async getListCategories(idBu:string){
  
 this.demoServive.getCategoryList(idBu).subscribe(async data=>{
     this.categoriesList = data
    this.categoriesList =  this.categoriesList.sort((a,b)=>{
      if (a.position === undefined) return 1;
      if (b.position === undefined) return -1;
  return  a.position - b.position ;
    })
     console.log( 'categories', this.categoriesList)
    
   
     this.categoriesList.forEach(cat=>{
        cat.statusPanel = false
    })
    
  },
  error => {
    console.error('Error al recuperar categorías:', error);
  }
)
 }
  openSheedAddCategory(textForm:string, idBussines:string, mood: 'edit' | 'new', idCategory?:string, category?:Categories,lengthList?:number){
   console.log(lengthList)
    return this._bottomSheet.open(DialogAddCategoryComponent, {
      // panelClass: 'bottom-sheet-container'
      data:{
        textTitleForm:textForm,
        idBussiness: idBussines,
        mood: mood,
        category:category,
        idCategory: idCategory,
        lengthList: lengthList
      }
      
    })
  }

  openSheetAddProduct(idCategory:string, idBussiness:string, textForm:string, mood: 'edit' | 'new', product?:Product, lengthList?:number ){
    console.log(idBussiness)  
    
    return this._bottomSheet.open(DialogAddProductComponent,{
      data: {
        idCategory:idCategory,
        idBussiness:idBussiness,
        textTitleForm: textForm,
        mood: mood,
        product: product,
        lengthList: lengthList

      }
      
    }).afterDismissed().subscribe(product=>{
      console.log('product', product)
      this.activsatedRouter.paramMap.subscribe(params=>{
        const idParams = params.get('id')
        if(idParams === 'new-menu'){
          this.router.navigateByUrl(`/app-samari/control/${idBussiness}`)
          const nameLocalStorageBussinessDemo = this.demoServive.nameLocalStorageDemoBussiness
          localStorage.removeItem(nameLocalStorageBussinessDemo)
        }
      })

    })
  }

  firstAddProduct(){
    
    
  }

  async saveLocalStorageCompany(company:BusinessInformation){
    const nameLocalStorageBussinessDemo = this.demoServive.nameLocalStorageDemoBussiness
    localStorage.setItem(nameLocalStorageBussinessDemo, JSON.stringify(company))
    let item = localStorage.getItem(nameLocalStorageBussinessDemo)
    if(item){
      // item = JSON.parse(item)
      this.infoDemo = await JSON.parse(item)
     if(this.infoDemo.id){
      this.getListCategories(this.infoDemo.id)
      this.getListProducts(this.infoDemo.id)
     }
    }else{
      console.log('No item')
    }   
  }


  filterProducts(idSection:string){
    const filterList =this.productList.filter(product=> product.idSection == idSection)
    return filterList.sort((a,b)=>{
      if (a.position === undefined) return 1;
      if (b.position === undefined) return -1;
      return b.position - a.position;
    })

  }
  openDialogCompanyName(mood: 'new' | 'edit', info: BusinessInformation){

    let idBus = ''
    this.matDialog.open(DialogEditBusinessComponent,{
      data:{
        infoCompany: info,
        mood:mood,
        textTitleForm: mood == 'new' ? 'Paso 1. Dinos el nombre de tu negocio' : 'Edita el nombre de tu negocio',
      },
      disableClose: mood == 'new' ? true : false
    }).afterClosed().subscribe(  (result:BusinessInformation)=>{
      
     if(result == null){
      this.router.navigateByUrl('/')
     }
     
      if(result && mood == 'new'){
        console.log('saveLOcal')
        this.saveLocalStorageCompany(result)
        

      }
      if(mood === 'new'){
        this.spinnerPrincipal = true
        if(this.currenUser){
          result.idUSer = this.currenUser?.uid
            this.demoServive.updateBussiness(result.id!, result).subscribe({
              next:()=> {
                this.openSnackBar('Se actualizo el documento con el id del usuario con el nombre de usuario')
                console.log( 'resultUID', result)
                
              },
              error:()=> this.openSnackBar('error al actualizar el documento con el nombre de usuario'),
            })
        }
        if(result){
          this.openSheedAddCategory('Paso 2. Crea tu primer categoria', result.id!, 'new', undefined, undefined, 0 ).afterDismissed().subscribe(resultCategory=>{
            if(resultCategory){
              console.log('result add categoru after demiis', resultCategory)
              this.openSheetAddProduct(resultCategory.id, result.id!, 'Paso 3. Agrega tu primer producto', 'new',undefined,)
            }else{
              console.log('no result category')
            }
          })
        }
      }
    })
  }

  

  
  togglebtn(idCategory:string){
    
    const category = this.categoriesList.find(cat=> cat.id == idCategory);
    if (category) {
      category.statusPanel = !category.statusPanel; 
    }
    
    this.categoriesList.forEach(cat=>{
      if(cat.statusPanel == true){
        this.isDrop = false
      }
    })
    
  }

  toggleActive(idProduct:string){
    this.progressBarProduct = idProduct
    const product = this.productList.find(prod=> prod.id == idProduct)
    const status = product?.status
    console.log(product)
    this.demoServive.desactiveProduct(this.infoDemo.id!, idProduct, status! ).then(()=>{
      this.progressBarProduct = ''
    }).catch(errr=>{
      this.progressBarProduct = ''
      
    })


    // console.log(idProduct)
    // const product = this.productList.find(prod=> prod.id == idProduct)
    // if(product){
    //  if(product.status === false){
    //   product.status = true;
    //   console.log('false', product)
    //   return
    //  }else if(product.status === true){
    //   product.status = false;
    //   console.log( 'true', product)
    //   return
    //  }
     
    // }
  }

  deleteProduct(product:Product){
    this.progressBarProduct = product.id!
    setTimeout(()=>{
      this.demoServive.deleteProduct(this.infoDemo.id!, product.id!).then(()=>{
        if(product.filePath != ''){
          this.demoServive.deleteFile(product.urlImage)

        }
        this._snackBar.open('Haz borrado un producto', 'Hecho', {
          duration: 5 *1000
        })
        this.progressBarProduct 
      }).catch(erro=>{
        this._snackBar.open(`Tuvimos un problema${erro}`, 'Hecho', {
          duration: 5 *1000
          
        })
        this.progressBarProduct     })

    },1000
  )
   
    
  }

  openDialogDeleteCategory(idCategory:string, plat:Product[]){
    console.log(this.infoDemo)

    this.matDialog.open(DialogDeleteCategoryComponent,{
      data:{
        idCategory: idCategory  ,
        idBussiness:this.infoDemo.id ,
        listProducs:plat ,
      }
    })

  }
  openDialogDeleteBusiness(){
    this.matDialog.open(DialogDeleteBusinessComponent).afterClosed().subscribe(data=>{
      console.log(data)
      if(data){
        this.deleteBusiness()
        


      }
    })
  }

  private deleteBusiness(){
    console.log( 'info-demo', this.infoDemo)
    if(this.infoDemo.id){
      this.demoServive.deleteBusiness(this.infoDemo.id!).then(result=>{
        console.log('delete', result)
        if(this.currenUser){
          this.router.navigateByUrl('/user')
        }else{
          this.router.navigateByUrl('/')
        }
  
      })

    }
    
  }

}
