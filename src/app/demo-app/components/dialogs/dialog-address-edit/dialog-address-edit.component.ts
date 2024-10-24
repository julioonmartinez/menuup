import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BusinessInformation } from '../../../../shared/interfaces/business-information';

@Component({
  selector: 'app-dialog-address-edit',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './dialog-address-edit.component.html',
  styleUrl: './dialog-address-edit.component.scss'
})
export class DialogAddressEditComponent {

  readonly data = inject<BusinessInformation>(MAT_DIALOG_DATA);

  form!: FormGroup;
  menu: BusinessInformation | null = null;

  constructor(
    private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<DialogAddressEditComponent>
  ){
    this.menu = this.data
    this.buildForm()
   
    
  }

  buildForm(){
    this.form = this.formBuilder.group({
      adress :[this.data.adress ?? ''],
      horario :[this.data.horario ?? ''],
      phone :[this.data.phone ?? ''],
    })  }


    saveForm(){
      if(this.menu){
        const adress = this.form.get('adress')?.value
        const horario = this.form.get('horario')?.value
        const phone = this.form.get('phone')?.value

        this.menu.adress = adress;
        this.menu.horario = horario;
        this.menu.phone = phone;
        this.dialogRef.close(this.menu)
      }
      
    }

}
