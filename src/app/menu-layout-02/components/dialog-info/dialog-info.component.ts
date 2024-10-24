import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { toDataURL } from 'qrcode';
import { BusinessInformation } from '../../../shared/interfaces/business-information';
@Component({
  selector: 'app-dialog-info',
  standalone: true,
  imports: [],
  templateUrl: './dialog-info.component.html',
  styleUrl: './dialog-info.component.scss'
})
export class DialogInfoComponent {
   qrCodeImage: string = ''

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {company:BusinessInformation}
  ){
    this.generateQRCode(`http://menuupp.com/menus/${data.company.id}`)

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
