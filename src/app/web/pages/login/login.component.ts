import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessInformation } from '../../../shared/interfaces/business-information';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink , MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form!: FormGroup;
  demoMenu: null | BusinessInformation = null;
  titleForm= 'Crea una cuenta gratis';
  loading: boolean = false

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private router : Router,
    private _snackBar : MatSnackBar,
  ){
    authService.currentUser$.subscribe({
      next:(user)=>{
        if(user){
          this.router.navigateByUrl('/user')
        }else{
          this.buildForm();
      

        }
      }
    })

  }

  buildForm(){
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho', {
      duration: 5 *1000
    })
    
  }


  onLogin(){
    if(this.form.valid){
      const email = this.form.get('email')?.value
        const pass = this.form.get('password')?.value
      this.authService.login(email, pass).subscribe({
        next:(res)=>{
          this.router.navigateByUrl('/user')
        }
      })
    }
  }


  onLoginWithGoogle(){
    this.authService.loginWithGoogle().subscribe({
      next:(result: User)=>{
        this.router.navigateByUrl('/user')
      },
      error:(err)=>{
        console.log('error', err)
      }
    })

  }
}
