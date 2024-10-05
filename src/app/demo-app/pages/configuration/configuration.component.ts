import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { DemoService } from '../../../shared/services/demo.service';
import { User } from 'firebase/auth';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MenuModel } from '../../../shared/interfaces/menu-model';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, FormsModule, MatButtonModule, MatIconButton , CommonModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  selectedColorPrincipal: string = '#000000';
  selectedColorSecondary: string = '#000000';
  selectedColorTerciary: string = '#000000';

  selectedMenu: string = '';
  currenUser: User | null = null;
  company: BusinessInformation | null = null;

  spinner:boolean = true;
  loading:boolean = false;

  listOptionMenusModel:MenuModel[]=[
    {id:'menu-demo-layout-01', name:'Menu Lindo' , permison:'premium'},
    {id:'menu-layout-02', name:'Elegance' , permison: 'premium'},
    {id:'menu-layout-03', name:'Simple' , permison:'free'},
    {id:'menu-layout-04', name:'Delux' , permison:'premium'},
    
  ]

  constructor(
    private authService : AuthService,
    private demoService : DemoService,
    private activatedRouter : ActivatedRoute, 
    private _snackBar : MatSnackBar,
    private router : Router,
  ){
    this.activatedRouter.paramMap.subscribe(params=>{
      const idCompany = params.get('id')
      if(idCompany){
        demoService.getBussiness(idCompany).subscribe({
          next:(compa)=>{
            this.company = compa
            console.log('compa', compa)
            if(this.company){
              this.spinner = false
            }
            console.log( 'get', this.company)
            if(this.company?.principalColor){
              this.selectedColorPrincipal = this.company.principalColor
            }
            if(this.company?.secondaryColor){
              this.selectedColorSecondary = this.company.secondaryColor
            }
            if(this.company?.terciaryColor){
              this.selectedColorTerciary = this.company.terciaryColor
            }
            if(this.company?.idMenu){
              this.selectedMenu = this.company.idMenu
            }
          },
          error:(err)=>{
            console.log('error', err)
          }
        })
      }
    })


    authService.currentUser$.subscribe(user=>{
      this.currenUser = user;
    })

  }

  onColorChangesPrincipal(event:any){
    console.log(event.target.value)
    this.demoService.updateColorBusiness(this.company?.id!, 'principalColor', event.target.value).subscribe({
      next:(result)=>{
        console.log('hz', result)
        this.openSnackBar('Haz cambiado el color principal')
      },
      error:(err)=>{
        this.openSnackBar('Error al cambiar el color')
      }
    })

  }

  onColorChangesSencondary(event:any){
    this.demoService.updateColorBusiness(this.company?.id!, 'secondaryColor', event.target.value).subscribe({
      next:(result)=>{
        console.log(result)
        this.openSnackBar('Haz cambiado el color secundario')
      },
      error:(err)=>{
        this.openSnackBar('Error al cambiar el color')
      }
    })
    

  }

  onColorChangesTerceary(event:any){
    this.demoService.updateColorBusiness(this.company?.id!, 'terciaryColor', event.target.value).subscribe({
      next:(result)=>{
        console.log(result)
        this.openSnackBar('Haz cambiado el color terciario')
      },
      error:(err)=>{
        this.openSnackBar('Error al cambiar el color')
      }
    })

  }
  onSelectedMenu(idMenu:string){
    console.log(idMenu)
    this.selectedMenu =idMenu
    this.demoService.updateIDMenuSelectedBUsiness(this.company?.id!, idMenu).subscribe({
      next:(result)=>{
        console.log(result)
        this.openSnackBar('Haz cambiado  cambiado el estilo de tu menu.')
      },
      error:(err)=>{
        console.log(err)
        this.openSnackBar('Error al el estilo de menu',)
      }
    })
  }

  openSnackBar(message:string){
    this._snackBar.open(message, 'Hecho',{
      duration: 5 *1000,
      verticalPosition:'top',
      horizontalPosition:'center'
    })
  }

  routerLinkCompany(){ 
      this.router.navigateByUrl(`/menu/${this.company?.id}`)
  
  }

}
