import { Component, Inject } from '@angular/core';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { toDataURL } from 'qrcode';
@Component({
  selector: 'app-bottom-sheet-code-qr',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './bottom-sheet-code-qr.component.html',
  styleUrl: './bottom-sheet-code-qr.component.scss'
})
export class BottomSheetCodeQrComponent {

  menu:BusinessInformation | null = null;
  qrCodeImage: string = ''
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BusinessInformation,

  ){
    this.menu = data
    this.generateQRCode(`https://menus-menu-app.web.app/${data.id}`)
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
     
    });
  }
}
