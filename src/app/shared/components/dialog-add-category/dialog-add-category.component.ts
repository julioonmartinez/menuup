import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {

  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { DemoService } from '../../services/demo.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Icon } from '../../interfaces/icon';
import { ICONS } from '../../enums/icon';
import { Categories } from '../../interfaces/categories';





@Component({
  selector: 'app-dialog-add-category',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule, MatSnackBarModule, MatBottomSheetModule,MatBottomSheetModule, ReactiveFormsModule,MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './dialog-add-category.component.html',
  styleUrl: './dialog-add-category.component.scss'
})
export class DialogAddCategoryComponent {
  myForm!: FormGroup;
  barProgress = false
  icons: Icon[] = ICONS;

  private _bottomSheetRef =
    inject<MatBottomSheetRef<DialogAddCategoryComponent>>(MatBottomSheetRef);
    titleForm: string = 'Crea una categoria';
    idBussiness: string | undefined = undefined;

    mood: 'new' | 'edit' = 'new';

    maxFileSize = 5 * 1024 * 1024; // 2MB
    allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
    uploadProgress: number | boolean = false;
    imagePreviewUrl: string  | null = null;
    unpload: boolean = false

    imageUrl: string | null = null;
    imagePath: string | null = null;

    constructor(
      private formBuilder : FormBuilder,
   
      private demoService : DemoService,
      private _snackBar :MatSnackBar,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: {textTitleForm:string, idBussiness:string, idCategory:string, mood: 'new' | 'edit', category:Categories, lengthList:number}
     
    ){
      this.mood = data.mood
      this.buildForm()
      this.titleForm = data.textTitleForm 
      this.idBussiness = data.idBussiness
      
      console.log('add', this.idBussiness)

    }


    buildForm(){
      if(this.mood == 'new'){
        this.myForm = this.formBuilder.group({
          name:['', Validators.required],
          filePath:[''],
          urlImage:[''],
          idIcons:[''],
        })
      }else{
        this.myForm = this.formBuilder.group({
          name:[this.data.category.name, Validators.required],
          filePath:[this.data.category.filePath],
          urlImage:[this.data.category.urlImage],
          idIcons:[this.data.category.idIcons],
        })

        this.imagePreviewUrl = this.data.category.urlImage!

      }
      
    }
    selectedIcon(idIcon:string){
      this.myForm.get('idIcons')?.setValue(idIcon)
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
        this.barProgress = true
        this.uploadProgress = false;
        this.demoService.startUpload(file, this.data.idBussiness, 'category').subscribe({
          next: (progressData) => {
            this.uploadProgress = true
            this.barProgress = true
            console.log(progressData)
            if(progressData.progress == 100){
              this.barProgress = false
            }
            if (progressData.downloadURL && progressData.filePath) {
              this.uploadProgress = false
              this.imageUrl = progressData.downloadURL;
              this.imagePath = progressData.filePath;
              this.myForm.get('urlImage')?.setValue(this.imageUrl);
              this.myForm.get('filePath')?.setValue(this.imagePath);
              
              
              
              
            
              
            }
          },
          error: (error) => {
            console.error('Upload failed:', error)
            this.openSnackBar('Ocurrio un error al guardar la imagen, intentarlo de nuevo'),
            this.imagePreviewUrl = this.data.category.urlImage!
          },
          complete: () => this.uploadProgress = false,
        });
      }
    }

    changeImage(event:any){
      this.demoService.cancelUpload()
      this.onFileSelected(event)
    }



    createCategory() {
      this.barProgress = true
      if (this.myForm.valid) {
        if(this.mood == 'new'){
          if (this.idBussiness != undefined) {
            const category: Categories = this.myForm.value
            category.position = this.data.lengthList + 1
            console.log(category)
            this.demoService.addCategory(this.idBussiness, category).then(result => {
              console.log('shett', result)
             
              setTimeout(()=>{
                this.barProgress = false
                this._bottomSheetRef.dismiss(result);
              }, 500)
              this.openSnackBar('Haz agregado una nueva categoría');
            }).catch(error => {
              this.openSnackBar(`Error al añadir la categoría: ${error}`);
            });
          }
        }else{
          if (this.idBussiness != undefined) {
            const category: Categories = this.myForm.value
            
            this.demoService.updateCategory(this.idBussiness, this.data.idCategory, category).then(result=>{
              setTimeout(()=>{
                this._bottomSheetRef.dismiss(result);
                this.barProgress = false
              }, 500)
              this.openSnackBar('Haz agregado una nueva categoría');
            }).catch(error => {
              this.openSnackBar(`Error al editar la categoría: ${error}`);
            });
          
          }
        }
      }else{
        this.openSnackBar('Revisa tu formulario porfavor')
        this.barProgress = false
      }
    }

    async close(){
      this.demoService.cancelUpload();
      this.barProgress = true
      if(this.imagePath){
        await this.demoService.deleteFile(this.imagePath)
      }
      this._bottomSheetRef.dismiss();
      
      
    }
    openSnackBar(message:string){
      this._snackBar.open(message, 'Hecho',{
        duration: 5 * 1000
      })

    }
}
