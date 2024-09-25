import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { DemoService } from '../../services/demo.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {MatRadioModule} from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Product } from '../../interfaces/product';
import { Categories } from '../../interfaces/categories';

@Component({
  selector: 'app-dialog-delete-category',
  standalone: true,
  imports: [MatProgressBarModule, MatSelectModule, MatDialogActions, MatRadioModule, FormsModule, MatSnackBarModule, MatDialogTitle, MatDialogContent, MatDialogClose, ReactiveFormsModule,CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './dialog-delete-category.component.html',
  styleUrl: './dialog-delete-category.component.scss'
})
export class DialogDeleteCategoryComponent implements OnInit {

  electionDoProduct: 'deleteProducs' | 'mantenerProducts' | 'otherCategory' | '' = '';
  idCategoryChange = '';
  loading: boolean = false
  
  // mood:string = 'del';
  listProducts: Product[] = []
  listCategories: Categories[] = [];
  public textAdvertencia = ''


  constructor( private formBuilder: FormBuilder,

    private demoService : DemoService,
    private _snackBar : MatSnackBar,
    private dialogRef : MatDialogRef<DialogDeleteCategoryComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: {
      idCategory:string,
      idBussiness:string,
      listProducs:Product[],
    }
  ){

    
    }
    ngOnInit(): void {
      this.demoService.getCategoryList(this.data.idBussiness).subscribe(list=>{
        this.listCategories = list
        this.listCategories = this.listCategories.filter(cat=>cat.id != this.data.idCategory)
        
      })

      console.log('dta-dialog', this.data)
    }

    


    async deleteCategory(){
      this.loading = true
      setTimeout( ()=>{
        this.demoService.deleteCategory(this.data.idBussiness, this.data.idCategory).then(async()=>{
          switch (this.electionDoProduct){
            case 'deleteProducs':
            await this.deletelistProduct()
            this.dialogRef.close()
            this.openSnachBar('Haz eliminado la categoria')
              break
            case 'mantenerProducts':
              this.mantenerProducts()
              this.dialogRef.close()
              this.openSnachBar('Haz eliminado la categoria')
              break
            case 'otherCategory':
              this.otherCategory()
              this.dialogRef.close()
              this.openSnachBar('Haz eliminado la categoria')
              break
            case '':
              this.textAdvertencia = 'Elige una opción'
              this.loading = false;
              break
            }
        }).catch(error=>{
          this.openSnachBar(`Error al eliminar la categoria: ${error}`)
        })
      }, 1000)

    }

    async deletelistProduct(){
       try{
        this.data.listProducs.forEach(async product=>{
          await this.demoService.deleteProduct(this.data.idBussiness, product.id!)
        })
        this.loading = false

      }catch{
        this.openSnachBar('Error al eliminar algun producto, vuelvelo a intentar')
        

      }

    }
    async mantenerProducts(){

      try{
        this.data.listProducs.forEach(async product=>{
          // product.idSection = '';
          this.demoService.updateProductCategory(product.id!, this.idCategoryChange, this.data.idBussiness)
          
        })
        this.loading = false

      }catch{
        this.openSnachBar('Error en le cambio de productos, vuelvelo a intentar')

      }
      
      
    }

   async otherCategory(){
     try{
      this.data.listProducs.forEach(async product=>{
        await this.demoService.updateProductCategory(product.id!, this.idCategoryChange, this.data.idBussiness)
       
      })
      this.loading = false
     }catch{
      this.openSnachBar('Error en le cambio de productos, vuelvelo a intentar')
     }
    }

    cancelDelete(){
      this.dialogRef.close()
    }

    openSnachBar(message:string){
      this._snackBar.open(message, 'Hecho', {
        duration:5*1000
      })
    }

}
