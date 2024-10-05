import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { toDataURL } from 'qrcode';
import { MenuService } from '../../../shared/services/menu.service';
import { BusinessInformation } from '../../../shared/interfaces/business-information';

@Component({
  selector: 'app-dialog-info',
  standalone: true,
  imports: [MatIconModule, MatListModule, CommonModule],
  templateUrl: './dialog-info.component.html',
  styleUrl: './dialog-info.component.scss',
})
export class DialogInfoComponent {
  busines!:BusinessInformation;
  qrCodeImage: string = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_aca806e1-da52-472f-a01e-c4a9256847fb.jpeg?alt=media&token=62103b22-83d8-4aab-a28a-df0061c851b4'

  constructor(
    private menuService :MenuService,
    // private cdr: ChangeDetectorRef,
  ){
    this.menuService.bussinesData$.subscribe(bu=>{
      if(bu){
        this.busines = bu
        this.generateQRCode(`https://samari-app.web.app/menus/${this.busines.id}`)
        // this.cdr.detectChanges()
      }
    })

    

  }

  generateQRCode(data: string): void {
    toDataURL(data,{
      width: 300,            // Tamaño del QR
      margin: 0,
      errorCorrectionLevel:'H' ,            // Sin margen alrededor
      color: {
        dark: '#2b2b2b',     // Color oscuro (azul)
        light: '#ffffff'     // Color claro (blanco)
      }
    }, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

     this.qrCodeImage = url
     console.log(this.qrCodeImage)
     
    });
  }

  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
  
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  }
 
}
