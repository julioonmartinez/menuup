import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DemoService } from '../../services/demo.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BusinessInformation } from '../../interfaces/business-information';
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-edit-business',
  standalone: true,
  imports: [MatIconModule, MatProgressBarModule, MatSnackBarModule, MatDialogTitle, MatDialogContent, MatDialogClose, ReactiveFormsModule,CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './dialog-edit-business.component.html',
  styleUrl: './dialog-edit-business.component.scss'
})
export class DialogEditBusinessComponent {
  data = inject(MAT_DIALOG_DATA);
  companyInfo!: BusinessInformation
  mood: 'edit' | 'new' = 'new';
  progressBar = false;
  currenUser: User | null = null;
  
  myForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private demoService : DemoService,
    private _snackBar : MatSnackBar,
    private authService : AuthService,
    private dialogRef : MatDialogRef<DialogEditBusinessComponent>,
    private router : Router,

  ){
    authService.currentUser$.subscribe(user=>{
      this.currenUser = user;
    })
    this.companyInfo = this.data.infoCompany
    console.log(this.data.infoCompany)
    this.mood = this.data.mood
    console.log(this.mood)
   this.buildForm()
    

  }

  buildForm(){
   if(this.mood == 'edit'){
    this.myForm = this.formBuilder.group({
      nameCompany:[this.data.infoCompany.nameCompany , [Validators.required, Validators.maxLength(30) ]]
    })
   }else{
    this.myForm = this.formBuilder.group({
      nameCompany:['' , [Validators.required, Validators.maxLength(30) ]]
      
    })
   }
  }

  editInfo(){
    
  }

  save() {
    this.progressBar = true
    if (this.myForm.valid) {
      
      if (this.mood === 'new') {
        const nameCompany = this.myForm.get('nameCompany')?.value
        this.demoService.createBussinessWithName(nameCompany).subscribe({
          next: (info) => {
            if (info.nameCompany) {
              this.companyInfo = info;
      
              this.dialogRef.close(this.companyInfo);
            }
          },
          error: (err) => {
            this.openackBar('Error al crear el negocio:');
            // Manejo adicional de errores si es necesario
          }
        });
      } else {
        console.log('moodSave', this.mood);
        this.demoService.updateBussinessWithName(this.companyInfo.id!, this.myForm.value).subscribe({
          next: (info) => {
            if (info.nameCompany) {
              setTimeout(()=>{
                this.companyInfo = info;
                this.dialogRef.close(this.companyInfo);
              }, 1000)
              
              this.openackBar('Excelente, has editado tu negocio');
            } else {
              console.log('error');
            }
          },
          error: (err) => {
            this.openackBar('Error al actualizar el negocio:');
            // Manejo adicional de errores si es necesario
            this.progressBar = false
          }
        });
      }
    } else {
      this.openackBar('Formulario no válido');
      this.progressBar = false
    }
  }

  buttonCancelar() {
    if(this.currenUser){
      if (this.mood === 'new') {
        this.companyInfo.nameCompany = 'Demo';
        this.demoService.createBussinessWithName(this.companyInfo.nameCompany).subscribe({
          next: (info) => {
            if (info.nameCompany) {
              this.companyInfo = info;
              this.dialogRef.close(this.companyInfo);
            }
          },
          error: (err) => {
            this.openackBar('Error al crear el negocio:')
            // Manejo adicional de errores si es necesario
          }
        });
      } else {
        this.dialogRef.close();
        
      }
    }else{
      this.dialogRef.close(null);
      // this.router.navigateByUrl('/')
    
    }
  }

  openackBar(message:string){
    this._snackBar.open(message, 'Hecho', {
      duration:5*1000
    })
    

  }
  }
