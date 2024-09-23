import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { BusinessInformation } from '../../interfaces/business-information';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dialog-survey',
  standalone: true,
  imports: [MatSnackBarModule, StarRatingComponent, FormsModule, CommonModule, MatSliderModule, MatButtonModule, ReactiveFormsModule, MatDialogModule, MatRadioModule, MatFormFieldModule, MatInputModule, StarRatingComponent],
  templateUrl: './dialog-survey.component.html',
  styleUrl: './dialog-survey.component.scss'
})
export class DialogSurveyComponent {
  data: BusinessInformation = inject(MAT_DIALOG_DATA);
  calificaciones: number[] = [1, 2, 3, 4, 5];
  encuestaForm!: FormGroup;

  // Opciones de calificación para las preguntas de radio buttons
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogSurveyComponent> ,
    private menuService : MenuService,
    private _snackBar : MatSnackBar
  ) {
    // Inicializamos el formulario con las preguntas
    this.builForm()
    console.log(this.data)
    
  }

  builForm(){
    this.encuestaForm = this.fb.group({
      servicio: [3, Validators.required],  // Valor inicial 3 estrellas
      calidadComida: [3],  // Valor inicial 3 estrellas
      tiempoEspera: ['', Validators.required],
      recomendacion: ['', Validators.required],
      sugerencias: [''],
      telefono: ['', [Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]]
    });
  }

  // Método para enviar el formulario
  submit() {
    if (this.encuestaForm.valid) {
      const encuestaData = this.encuestaForm.value;

      this.menuService.AddSurvey(this.data.id!, encuestaData)
      this.openSnackBar('Gracias por contestar')
      

      

      // Cerrar el diálogo
      this.dialogRef.close();
    } else {
      this.openSnackBar('El formulario no es válido')
      console.log('El formulario no es válido');
    }
  }

  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho',{
      duration: 5 * 1000
    })
  }

}
