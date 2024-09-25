import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DemoService } from '../../../shared/services/demo.service';

import { User } from 'firebase/auth';


import { firstValueFrom } from 'rxjs';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { UserTap } from '../../../shared/interfaces/user-tap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatSnackBarModule, RouterModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public form!: FormGroup;
  demoMenu: null | BusinessInformation= null;
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
          this.router.navigateByUrl('/app-samari')
        }else{
          this.buildForm();
          this.getDemoMenu()

        }
      }
    })
    
  }

  getDemoMenu(){
   const  nameBusinessItem = this.demoService.nameColletionBussinesDemo
   const business =  localStorage.getItem(nameBusinessItem)
    if(business){
      const businessCompany: BusinessInformation = JSON.parse(business)
     this.demoService.getBussiness(businessCompany.id!).subscribe({
      next:(data)=>{
        this.demoMenu = data
         this.titleForm = `Crea una cuenta y no pierdas tu menu de: ${businessCompany.nameCompany}`
      }
     })
    }
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
    this.authService.signUp(email, pass).subscribe({
      next:async (res)=>{
        try {
          console.log('Iniciando sesión con email, usuario recibido:', res);
  
          // Si existe demoMenu, intenta actualizarlo
          if (this.demoMenu) {
            console.log('Actualizando demoMenu con los datos del usuario...');
            this.demoMenu.emailCompany = res.email!;
            this.demoMenu.idUSer = res.uid;
            console.log( 'res uid', res.uid)
            console.log('res-user', res)
  
            // Usa firstValueFrom para esperar a que la actualización del menú se complete
            await firstValueFrom(this.demoService.updateBussiness(this.demoMenu.id!, this.demoMenu));
  
            this.openSnackBar('Menu correctamente guardado');
            console.log('Menú actualizado correctamente');
            localStorage.removeItem(this.demoService.nameLocalStorageDemoBussiness);
          } else {
            console.log('No se encontró ningún demoMenu para actualizar');
          }
  
          // Crear la información del usuario
          const userInfo: UserTap = {
            uid: res.uid,
            email: res.email!,
            role: 'free',
            create: new Date()
          };
  
          console.log('Guardando la información del usuario...');
          // Guardar la información del usuario
          await firstValueFrom(this.authService.saveUserInfo(userInfo));
          console.log('Información del usuario guardada correctamente');
  
          // Redirigir al usuario
          console.log('Redirigiendo al usuario a /app-samari');
          this.router.navigateByUrl('/app-samari');
        } catch (error) {
          console.error('Error en el proceso de login:', error);
          this.openSnackBar('Hubo un error al completar el proceso, inténtalo nuevamente');
          // Evitar la redirección si hay un error
          return;
        }
      },
      error:(err)=>{
        this.openSnackBar('Hubo un error al registrarte, intentalo nuevamente');
        console.error('Google login error:', err);
      }
    })
  }else{

  }
    }

    openSnackBar(message:string){
      this._snackBar.open(message, 'Hecho', {
        duration: 5 *1000
      })
      
    }

    loginWithGoogle() {
      this.authService.loginWithGoogle().subscribe({
        next: async (res: User) => {
          try {
            console.log('Iniciando sesión con Google, usuario recibido:', res);
    
            // Si existe demoMenu, intenta actualizarlo
            if (this.demoMenu) {
              console.log('Actualizando demoMenu con los datos del usuario...');
              this.demoMenu.emailCompany = res.email!;
              this.demoMenu.idUSer = res.uid;
              console.log(res.uid)
              console.log(res)
    
              // Usa firstValueFrom para esperar a que la actualización del menú se complete
              await firstValueFrom(this.demoService.updateBussiness(this.demoMenu.id!, this.demoMenu));
    
              this.openSnackBar('Menu correctamente guardado');
              console.log('Menú actualizado correctamente');
              localStorage.removeItem(this.demoService.nameLocalStorageDemoBussiness);
            } else {
              console.log('No se encontró ningún demoMenu para actualizar');
            }
    
            // Crear la información del usuario
            const userInfo: UserTap = {
              uid: res.uid,
              email: res.email!,
              role: 'free',
              create: new Date()
            };
    
            console.log('Guardando la información del usuario...');
            // Guardar la información del usuario
            await firstValueFrom(this.authService.saveUserInfo(userInfo));
            console.log('Información del usuario guardada correctamente');
    
            // Redirigir al usuario
            console.log('Redirigiendo al usuario a /app-samari');
            this.router.navigateByUrl('/app-samari');
          } catch (error) {
            console.error('Error en el proceso de login:', error);
            this.openSnackBar('Hubo un error al completar el proceso, inténtalo nuevamente');
            // Evitar la redirección si hay un error
            return;
          }
        },
        error: (err) => {
          this.openSnackBar('Hubo un error al registrarte, intentalo nuevamente');
          console.error('Google login error:', err);
        },
      });

    }
}
