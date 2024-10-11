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
import { DemoService } from '../../../shared/services/demo.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-no-register',
  standalone: true,
  imports: [MatProgressBarModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink , MatCardModule],
  templateUrl: './no-register.component.html',
  styleUrl: './no-register.component.scss'
})
export class NoRegisterComponent {
  public form!: FormGroup;
  demoMenu: null | BusinessInformation = null;
  titleForm= 'Crea una cuenta gratis';
  loading: boolean = false

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private router : Router,
    private _snackBar : MatSnackBar,
    private demoService : DemoService,
  ){
    authService.currentUser$.subscribe({
      next:(user)=>{
        if(user){
          this.router.navigateByUrl('/user/account')
        }else{
          this.buildForm();
      

        }
      }
    })

    this.getDemoMenu();
    console.log('account')

  };

  getDemoMenu() {
    const nameBusinessItem = this.demoService.nameColletionBussinesDemo;
    const business = localStorage.getItem(nameBusinessItem);
    
    if (business) {
      try {
        const businessCompany: BusinessInformation = JSON.parse(business);
        this.demoService.getBussiness(businessCompany.id!).subscribe({
          next: (data) => {
            this.demoMenu = data;
            this.titleForm = `Crea una cuenta y no pierdas tu menú de ${businessCompany.nameCompany}`;
          }
        });
      } catch (e) {
        console.error('Error parsing business data from localStorage:', e);
      }
    }
  }
  

   buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho', {
      duration: 5 *1000,
      panelClass: ['snackbar-error'],
    })
    
  };


  onRegister() {
    if (this.form.valid) {
      this.loading = true; // Activar el indicador de carga
      const email = this.form.get('email')?.value;
      const pass = this.form.get('password')?.value;
      
      this.authService.signUp(email, pass).subscribe({
        next: (res: User) => {
          if (this.demoMenu) {
            this.demoMenu.idUSer = res.uid;
            
            this.demoService.updateBussiness(this.demoMenu.id!, this.demoMenu).subscribe({
              next: () => { /* Manejar el éxito */ },
              error: (err) => {
                this.openSnackBar(err);
              }
            });
          }
          this.router.navigateByUrl('/user');
        },
        error: (err) => {
          this.handleAuthError(err);
        },
        complete: () => {
          this.loading = false; // Desactivar el indicador de carga
        }
      });
    }else{
      this.openSnackBar('Registra un correo y contraseña por favor')
    }
  }
  


  onLoginWithGoogle() {
  this.authService.loginWithGoogle().subscribe({
    next: (result) => {
      if (this.demoMenu) {
        this.demoMenu.idUSer = result.uid;
        this.demoService.updateBussiness(this.demoMenu.id!, this.demoMenu).subscribe({
          next: () => { /* Manejar el éxito */ },
          error: (err) => {
            this.openSnackBar(err);
          }
        });
      }
      this.router.navigateByUrl('/user');
    },
    error: (err) => {
      this.handleAuthError(err);
    }
  });
}

handleAuthError(error: any) {
  let message = 'An unknown error occurred';
  
  if (error && error.code) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'The email address is already in use by another account.';
        break;
      case 'auth/weak-password':
        message = 'The password is too weak.';
        break;
      case 'auth/invalid-email':
        message = 'The email address is not valid.';
        break;
      case 'auth/wrong-password':
        message = 'The password is incorrect.';
        break;
      case 'auth/user-not-found':
        message = 'No user found with this email.';
        break;
      case 'auth/user-disabled':
        message = 'The user account has been disabled.';
        break;
      case 'auth/network-request-failed':
        message = 'A network error occurred. Please try again later.';
        break;
      default:
        console.error('Unmanaged error code:', error.code);
    }
  } else {
    console.error('Error without code:', error);
  }

  this.openSnackBar(message);
}


}
