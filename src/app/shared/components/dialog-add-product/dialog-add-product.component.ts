import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {MatSelectModule} from '@angular/material/select';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DemoService } from '../../services/demo.service';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Categories } from '../../interfaces/categories';
import { Product } from '../../interfaces/product';



@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [ 
             MatSelectModule,
             MatIconModule,
             

             MatBottomSheetModule,
             FormsModule,
             ReactiveFormsModule,
             MatFormFieldModule,
             MatButtonModule,
           
             MatInputModule,
             MatSlideToggleModule,
             MatProgressBarModule,
             CommonModule,
             MatSnackBarModule,
             MatProgressSpinnerModule
            ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss'
})
export class DialogAddProductComponent implements OnInit {

  // data = inject(MAT_BOTTOM_SHEET_DATA);
  maxFileSize = 5 * 1024 * 1024; // 2MB
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
  uploadProgress: number | null = null;
  upload: boolean = false;
  imagePreviewUrl: string | null = null;
  

  myForm!: FormGroup;
  listCategories: Categories[] = [];
  isSaving = false;
  saveMessage = '';
  idBussiness:string  = '';
  titleForm:string = '';
  isSavingForms = false;
  mood: 'edit' | 'new' = 'new'

  imageUrl: string | null = null;
  imagePath: string | null = null;

  private _bottomSheetRef = inject<MatBottomSheetRef<DialogAddProductComponent>>(MatBottomSheetRef);


  constructor(
    private formBuilder: FormBuilder,

    private demoService: DemoService,
    private _snackBar : MatSnackBar,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {textTitleForm:string, idBussiness:string, idCategory:string, mood:'edit' | 'new', product:Product, lengthList:number,}
  ) {

  }

   ngOnInit(): void {
    this.mood = this.data.mood
    this.buildForm(); 
    console.log(this.data.product)
    this.idBussiness = this.data.idBussiness;
    console.log(this.data)
    console.log()
   this.firstFunctions()
  }

  async firstFunctions() {
     this.idBussiness = this.data.idBussiness;
     this.buildForm(); 
    this.titleForm = this.data.textTitleForm;
   
    await this.getLisCategories(this.idBussiness);
    
     // Primero construimos el formulario vacío
     // Luego obtenemos las categorías
  }
  
  async getLisCategories(idBu: string) {
    return this.demoService.getCategoryList(idBu).subscribe(data => {
      console.log(data);
      this.listCategories = data;
      if (this.listCategories.length > 0) {
        // this.myForm.get('idSection')?.setValue(this.listCategories[0].id);  // Si es necesario, asigna un valor por defecto
      }
    });
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
      this.isSaving = true
      this.demoService.startUpload(file, this.idBussiness, 'product').subscribe({
        next: (progressData) => {
          this.isSaving = true;
          if(progressData.progress == 100){
            this.isSaving = false
          }
          if (progressData.downloadURL && progressData.filePath) {
            this.imageUrl = progressData.downloadURL;
            this.imagePath = progressData.filePath;
            this.upload = false
            this.uploadProgress = null
            

            this.myForm.get('urlImage')?.setValue(this.imageUrl);
            this.myForm.get('filePath')?.setValue(this.imagePath);
          }
        },
        error: (error) =>{this.isSaving = false,console.error('Upload failed:', error)}, 
        complete: () => this.uploadProgress = null,
      });
    }
  }

  changeImageRestaurante(){
    
  }


  addProduct() {
    if (this.myForm.valid) {
      this.isSavingForms = true;
      if(this.mood == 'new'  ){
        const productData :Product = this.myForm.value;
       if(this.data.lengthList != undefined){
        productData.position = this.data.lengthList +1
       }
     
     if(this.idBussiness){
      this.demoService.addProduct(this.idBussiness, productData)
        .then(() => {
          setTimeout(() => {
            this.openSnackBar('Producto agregado');
            this._bottomSheetRef.dismiss();
          }, 2000)

         
          
          // Redirigir a la pantalla principal después de guardar
         
        })
        .catch(error => {
          this.isSaving = false;
          this.openSnackBar(`Algo salió mal, vuelve a intentarlo: ${error}`);
        });
     }   
      }else{
        const productData = this.myForm.value;
        if(this.idBussiness){
          this.demoService.updateProduct(this.data.product.id!, this.data.idBussiness,productData).subscribe({
            next:()=>{

            },
            error:(error) =>{
              this.openSnackBar(`Hubo un error al editar el producto:${error}`)
            },
            complete:()=>{
              
              setTimeout(() => {
                this._bottomSheetRef.dismiss();
                this.openSnackBar('Producto Editado');
                
              }, 1000)
              

            }
          })
        }

      }
      
    } else {
      this.openSnackBar('Formulario inválido')
      console.log(this.myForm.value)
    }
  }

  close() {
    this.demoService.cancelUpload(); // Cancela la carga si se cierra el formulario
    if(this.imagePath){
      this.demoService.deleteFile(this.imagePath)
    }
    this._bottomSheetRef.dismiss();
  }

  buildForm() {
    if(this.data.mood == 'new'){
      this.myForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        subtitle: [''],
        price: ['', Validators.required],
        idSection: [this.data.idCategory, Validators.required],
        status: [true, Validators.required],
        urlImage:[''],
        filePath:[''],
      });
    }else{
      this.myForm = this.formBuilder.group({
        name: [this.data.product.name, Validators.required],
        description: [this.data.product.description,],
        subtitle: [this.data.product.subtitle],
        price: [this.data.product.price, Validators.required],
        idSection: [this.data.product.idSection, Validators.required],
        status: [this.data.product.status, Validators.required],
        urlImage:[this.data.product.urlImage],
        filePath:[this.data.product.filePath],
      });
      this.imagePreviewUrl = this.data.product.urlImage
      
    }
  }

  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho', {
      duration: 5*1000
    })
  }

  changeImage(event:any){
    const urlImage = this.myForm.get('urlImage')?.value;

    this.demoService.cancelUpload()
    this.onFileSelected(event)
  }


}
