import { Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { UserTap } from '../../../shared/interfaces/user-tap';
import { MatListModule } from '@angular/material/list';
import { MenuService } from '../../../shared/services/menu.service';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MenusUserService } from '../../../shared/services/menus-user.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DemoService } from '../../../shared/services/demo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddMenuComponent } from '../../../shared/dialogs/dialog-add-menu/dialog-add-menu.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Credit } from '../../../shared/interfaces/credit';


@Component({
  selector: 'app-selection-menu-credit',
  standalone: true,
  imports: [MatProgressSpinnerModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule, CommonModule, MatListModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './selection-menu-credit.component.html',
  styleUrl: './selection-menu-credit.component.scss'
})
export class SelectionMenuCreditComponent {

  private _matDialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  user : UserTap | null = null;
  menus: BusinessInformation[] = [];
  idPay: string = '';
  credit:Credit | null = null;
  suscription: 'mensual' | 'anual' | '' = '';
  loading: boolean = true
  form!: FormGroup;
  

  constructor(
    private authService : AuthService,
    private menusService : MenusUserService,
    private menuService : DemoService,
    private formBuilder : FormBuilder,
    private router : Router,
    private activatedRouter: ActivatedRoute,
    
    
  ){

    this.buildForm();

    this.activatedRouter.paramMap.subscribe({
      next:(params)=>{
        const idPayParams = params.get('idPay');
        if(idPayParams){
          this.idPay = idPayParams
        }
      }
    })

    this.authService.currentUser$.subscribe({
      next:(userData)=>{
        if(userData?.uid){
          authService.getInfoUser(userData.uid).subscribe(userInfo=>{
            this.user = userInfo;
            console.log(this.user)
            if(this.user?.credits){
              const sus: Credit | undefined = this.user?.credits?.find(cre=> cre.idPay === this.idPay);
              console.log(sus)
            if(sus){
              this.suscription = sus.period == 'monthly' ? 'mensual' : 'anual';
              this.credit = sus
            }
            }

          });
          this.menusService.getMenusUser(userData.uid).subscribe({
            next:(menusData=>{
              this.menus = menusData;

              this.menus = this.menus.filter(menu=> menu.nivel == 'basic' || menu.nivel == undefined)
              this.loading = false
              console.log(this.menus)
            })
          });
        }
      }
    })

  }

  createMenu(){
    this._matDialog.open(DialogAddMenuComponent).afterClosed().subscribe(result=>{
      console.log(result)
      if(result){
        this.menuService.createMenuWithNameAndIdUser(result, this.user?.id!).subscribe({
          next:(resultt)=>{
            this.menusService.getMenusUser(this.user?.id!).subscribe({
              next:(menusData=>{
                this.menus = menusData;
                this.menus = this.menus.filter(menu=> menu.nivel == 'basic' || menu.nivel == undefined)
                this.buildForm();
              })
            })
            this.openSnackBar('Haz creado un nuevo menú')
          },
          error:(err)=>{
            this.openSnackBar('Parece hubo un error')
          }
        })
      }
    })
    
  }

  openSnackBar(message:string){
    this._snackBar.open(message,'Hecho', {
      duration: 5 * 1000
    })
  }

  buildForm(){
    this.form = this.formBuilder.group({
      idMenu: ['', Validators.required]
    })
  }

  upNivelMenu(){
    if(this.user?.credits?.length! > 0){
      if(this.form.valid){
        const idMenu = this.form.get('idMenu')?.value;  // Obtener el valor seleccionado del formulario
    
        console.log('ID del menú seleccionado:', idMenu);
    
        if (idMenu) {
          // Aquí podrías hacer la lógica para hacer "premium" el menú seleccionado.
          // Lógica para manejar el idMenu
  
          this.menusService.upNivelMenu(idMenu,this.credit?.idPay!, this.credit?.period!, this.credit! ).subscribe({
            next:(result)=>{
              this.authService.removeOneCredit(this.idPay).subscribe({
                next:(mess)=>{
                  this.router.navigateByUrl('/user')
                  
                }
              })
              this.openSnackBar(`El menú con ID ${idMenu} ha sido seleccionado para hacer premium`);
  
            }
          })
        } else {
          this.openSnackBar('Selecciona un menú');
        }
      } else {
        this.openSnackBar('Selecciona un menú');
      }
    }else{
      this.openSnackBar('Parece no tienes creditos, porfavor compra uno')
    }
  }
}  
