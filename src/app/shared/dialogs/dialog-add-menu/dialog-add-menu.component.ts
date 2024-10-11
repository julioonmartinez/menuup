import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { duration } from 'html2canvas/dist/types/css/property-descriptors/duration';

@Component({
  selector: 'app-dialog-add-menu',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './dialog-add-menu.component.html',
  styleUrl: './dialog-add-menu.component.scss'
})
export class DialogAddMenuComponent {

  form!: FormGroup
  readonly dialogRef = inject(MatDialogRef<DialogAddMenuComponent>);
  _snackBar = inject(MatSnackBar)
  

  constructor(
    private formBuilder : FormBuilder,
  ){
    this.builForm()
  }


  builForm(){
    this.form = this.formBuilder.group({
      name:['', Validators.required]
    })
  }

  addBussiness(){
    if(this.form.valid){
      this.dialogRef.close(this.form.get('name')?.value)
      
    }else{
      this.openSnackBar('Crea un nombre para tu menú')
    }
  }

  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho', {
      duration: 5 * 1000
    })

  }
  
}
