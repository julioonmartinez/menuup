import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-layout-routing',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout-routing.component.html',
  styleUrl: './layout-routing.component.scss'
})
export class LayoutRoutingComponent implements OnInit {

  constructor(
    private routerActivated : ActivatedRoute,
    private menuService : MenuService,
    private router : Router
  ){}
  ngOnInit(): void {
   this.routerActivated.params.subscribe(params=>{
    const idCompany = params['idCompany']
    
    if(idCompany){
      this.menuService.setBusinessId(idCompany);
      this.menuService.getBusinessDB(idCompany).subscribe({
        next: businesInformation=>{
          console.log(businesInformation)
          this.router.navigate([businesInformation.idMenu, idCompany ])
        }
      })
    }else{
      console.log('no hay id')
    }

   })
  }

  
}

