import { Component } from '@angular/core';
import { Promos } from '../../../shared/interfaces/promos';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConditionsComponent } from '../dialog-conditions/dialog-conditions.component';

@Component({
  selector: 'app-promos-feed',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './promos-feed.component.html',
  styleUrl: './promos-feed.component.scss'
})
export class PromosFeedComponent {

  public promos: Promos[] = [
    {
      id:'',
    idBussines:'',
    nameBusiness:'Ameyali',
    urlImage:'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fpromo-prueba%2FGemini_Generated_Image_hkm4nehkm4nehkm4.jpeg?alt=media&token=39d713f3-e447-4982-b62e-060c51ebfa20',
    title:'Pizzas al 30% de descuento',
    description: 'Todos los martes 30% de descuento en nuestras mejores pizzas',
    conditions:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores modi optio cumque, hic animi laudantium consectetur reprehenderit rerum quia minus dolor aut illo praesentium consequatur laboriosam blanditiis quidem temporibus!',
    promotionPeriod: new Date(),
    },
    {
      id:'',
    idBussines:'',
    nameBusiness:'Tacos Santitos',
    urlImage:'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fpromo-prueba%2FGemini_Generated_Image_uaiq6duaiq6duaiq.jpeg?alt=media&token=4768a3e0-7448-4814-9357-9d0c6663328f',
    title:'Orden de tacos a $30',
    description: 'Todos los Lunes la orden de 5 tacos en 50 pesos' ,
    conditions:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores modi optio cumque, hic animi laudantium consectetur reprehenderit rerum quia minus dolor aut illo praesentium consequatur laboriosam blanditiis quidem temporibus!',
    promotionPeriod: new Date(),
    },
    {
      id:'',
    idBussines:'',
    nameBusiness:'Barraco',
    urlImage:'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fpromo-prueba%2FGemini_Generated_Image_hkm4nehkm4nehkm4.jpeg?alt=media&token=39d713f3-e447-4982-b62e-060c51ebfa20',
    title:'2 x 1 en Gin tonic',
    description:'Martes de chicas',
    conditions:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores modi optio cumque, hic animi laudantium consectetur reprehenderit rerum quia minus dolor aut illo praesentium consequatur laboriosam blanditiis quidem temporibus!',
    promotionPeriod: new Date(),
    }
  ];
  constructor(
    private matDialog : MatDialog
  ){}

  openDialogCondition(conditions:string){
    this.matDialog.open(DialogConditionsComponent,
      {
        data:conditions
      }
    ).afterClosed().subscribe(data=>{
      console.log(data)
    })
  }



}
