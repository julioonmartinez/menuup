import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { MenuService } from '../../shared/services/menu.service';
import { BusinessInformation } from '../../shared/interfaces/business-information';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogSurveyComponent } from '../../shared/components/dialog-survey/dialog-survey.component';
import { ButtonCreateMenuComponent } from '../../shared/components/button-create-menu/button-create-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ButtonCreateMenuComponent, MatDialogModule, MatProgressSpinnerModule, RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule, CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimations', [
      transition('detail => isLeft', slideFromSectionToDetailReturn()), // Regresar desde `DetailPlatilloComponent` hacia `SectionComponent`
      transition('* => isLeft', slideTo('left')),  // Otras transiciones a la izquierda
      transition('* => isRight', slideTo('right')),  // Otras transiciones a la derecha
      transition('isLeft => detail', slideFromSectionToDetail()),  // Transición específica de `SectionComponent` a `DetailPlatilloComponent`
     
    ])
  ]
})
export class LayoutComponent01 implements OnInit {
  _matDialog = inject(MatDialog)
  showBackButton = false;
  bussines!: BusinessInformation;
  loading:boolean = true;
  user : boolean = false
  idBussiness: string = ''
  private routeSubscription!: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRouter : ActivatedRoute,
    private menuService : MenuService,
    private cdr: ChangeDetectorRef,

  ){}

  ngOnInit(): void {

    // this.menuService.bussinesData$.subscribe(data=>{
    //   if(data){
    //     this.bussines = data
    //     this.idBussiness = data.id!
    //     this.loading = false
    //     this.cdr.detectChanges()
    //     console.log('data', data)
    //   }
    // })

    this.activatedRouter.params.subscribe(params => {
      const idBusiness = params['idCompany'];
      console.log('ID Business from params:', idBusiness);  // Verificar si params contiene el ID de la empresa
      if (idBusiness) {
          this.menuService.setBusinessId(idBusiness);
          this.menuService.getBusinessDB(idBusiness).subscribe(data => {
              this.bussines = data;
              console.log('Business data:', data);  // Verificar si se están recibiendo los datos del negocio
              this.idBussiness = data.id!;
              this.loading = false;
              this.cdr.detectChanges();
              this.checkCurrentUrl();
              // Inicializa los eventos del router después de cargar los datos
              this.setupRouterEvents();
          });
      }
  });


  

    

    

    

    
  };

  checkCurrentUrl(): void {
    const currentUrl = this.router.url;
    console.log('Initial URL:', currentUrl);  // Verifica la URL al cargar o recargar
    // Evalúa la visibilidad del botón "back" según la URL actual
    this.showBackButton = currentUrl !== `/menu-demo-layout-01/${this.bussines?.id}/home`;
    this.cdr.detectChanges();
}


  setupRouterEvents(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  ).subscribe((event) => {
      console.log('NavigationEnd event detected:', event);  // Debug para verificar si NavigationEnd se dispara
      if (this.bussines?.id) {
          const currentUrl = this.router.url;
          console.log('Current URL:', currentUrl);  // Asegurar que el valor de la URL actual se imprima
          this.showBackButton = currentUrl !== `/menu-demo-layout-01/${this.bussines.id}/home`;
          this.cdr.detectChanges();
      }
  });

     // Verificar si los eventos de NavigationStart se disparan
     this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
  ).subscribe((event) => {
      console.log('NavigationStart event detected:', event);  // Debug para verificar si NavigationStart se dispara
      if (this.bussines?.id) {
          const currentUrl = this.router.url;
          console.log('Current URL on start:', currentUrl);  // Asegurar que el valor de la URL actual se imprima
          this.showBackButton = currentUrl !== `/menu-demo-layout-01/${this.bussines.id}/home`;
          this.cdr.detectChanges();
      }
  });
};

  openDialogSurvey(){
    this._matDialog.open(DialogSurveyComponent,{
      data:this.bussines,
    })
  }

  goBack(): void {
    this.location.back();
  }

  prepareRoute(outlet: RouterOutlet) {
    // const animation = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    // console.log('Aplicando animación:', animation);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}





function slideTo(direction: string) {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ [direction]: '100%' })  // El componente entrante comienza fuera de la pantalla, a la derecha
    ], { optional: true }),
    group([
      query(':leave', [
        animate('400ms ease', style({ [direction]: '-100%' }))  // El componente saliente se mueve hacia la izquierda
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease', style({ [direction]: '0%' }))  // El componente entrante se mueve a su posición
      ], { optional: true })
    ])
  ];
}

function slideFromSectionToDetail() {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '100%' })  // El componente `DetailPlatilloComponent` comienza fuera de la pantalla a la derecha
    ], { optional: true }),
    group([
      query(':leave', [
        animate('400ms ease', style({ left: '-100%' }))  // `SectionComponent` sale hacia la izquierda
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease', style({ left: '0%' }))  // `DetailPlatilloComponent` entra desde la derecha
      ], { optional: true })
    ])
  ];
}
function slideFromSectionToDetailReturn() {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ right: '100%' })   // El componente section comienza fuera de la pantalla a la izquierda
    ], { optional: true }),
    group([
      query(':leave', [
        animate('400ms ease', style({ right: '-100%' }))  // el componente detail sale hacia la derecha
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease', style({ right: '0%' }))   // el componente section entra de la izquierda
      ], { optional: true })
    ])
  ];
}

