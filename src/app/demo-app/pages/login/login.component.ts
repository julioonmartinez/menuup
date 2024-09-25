import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form!: FormGroup;



  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private router : Router,
    private _snackBar : MatSnackBar,
  ){
    this.buildForm()
  }

  buildForm(){
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onRegister(){
    if(this.form.valid){
      const email = this.form.get('email')?.value
    const pass = this.form.get('password')?.value
    this.authService.login(email, pass).subscribe({
      next:(res)=>{
        this.router.navigateByUrl('/app-samari')
        console.log(res)
      },
      error:(err)=>{
        this.openSnackBar('Hubo un error al iniciar sesion, intentalo nuevamente')

      }
    })
  }else{
    this.openSnackBar('Te falta algun dato, porfavor revisalo')

  }
    }

    openSnackBar(message:string){
      this._snackBar.open(message, 'Hecho', {
        duration: 5 *1000
      })
      
    }
    loginWithGoogle() {
      this.authService.loginWithGoogle().subscribe({
        next: (res) => {
          this.router.navigateByUrl('/app-samari')
        },
        error: (err) => {
          this.openSnackBar('Hubo un error al registrarte, intentalo nuevamente')
          console.error('Google login error:', err)},
      });
    }

}
