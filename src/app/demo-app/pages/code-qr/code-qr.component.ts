import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { toDataURL } from 'qrcode';
import { DemoService } from '../../../shared/services/demo.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase/auth';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BusinessInformation } from '../../../shared/interfaces/business-information';

@Component({
  selector: 'app-code-qr',
  standalone: true,
  imports: [MatSnackBarModule, MatTooltipModule, ClipboardModule, MatButtonModule, MatIconModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './code-qr.component.html',
  styleUrl: './code-qr.component.scss'
})
export class CodeQrComponent implements OnInit {
  
  urlCodigoQR = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fhome%2F_aca806e1-da52-472f-a01e-c4a9256847fb.jpeg?alt=media&token=62103b22-83d8-4aab-a28a-df0061c851b4';
  isQR: boolean = true
  nameMenu = ''
  url = '';
  isLoading: boolean = true;
  user: User | null = null;
  qrCodeImage: string = '';
  isPremiumUser: 'free' | 'admin' |'premium' | 'noUser' = 'noUser'

  constructor(
    private activateRoutes: ActivatedRoute,
    private demoService: DemoService,
    private authService : AuthService,
    private _snackBar : MatSnackBar,
  ){

  }
  ngOnInit(): void {
    this.activateRoutes.paramMap.subscribe(params=>{
      const id  = params.get('id')
      if(id){
        this.url = `https://samari-app.web.app/menus/${id}`
        this.generateQRCode(this.url)
        this.demoService.getBussiness(id).subscribe((data: BusinessInformation)=>{
          if(data.nameCompany){
            this.nameMenu = data.nameCompany
          }
          this.isLoading = false 
        })
      }
      
    })
    this.authService.currentUser$.subscribe(userDat=>{
      this.user = userDat
      if(this.user){
        

      }
    })
    
  }

  downloadQRCode(): void {
    const link = document.createElement('a');
    link.href = this.qrCodeImage;
    link.download = `${this.nameMenu}-code-qr.png`;  // Nombre del archivo a descargar
    link.click();
  }

  generatePDF(): void {
    const content = document.getElementById('qr-layout');
    
    // Verificar que el elemento existe
    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        // Establecer las nuevas dimensiones para el PDF
        const pdfWidth = 100;  // Ancho deseado en milímetros (mayor que A4)
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;  // Mantener proporción de la imagen
  
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [pdfWidth, pdfHeight]  // Establecer las nuevas dimensiones
        });
  
        // Insertar la imagen en el PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('menu-qr.pdf');
      });
    } else {
      console.error('Elemento con ID "qr-layout" no encontrado.');
    }
  }

  clickClip(){
    this.openSnackBar('Enlance copiado')
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
      this.isQR = true
      this.qrCodeImage = url;
      this.urlCodigoQR = this.qrCodeImage
      console.log(this.qrCodeImage)
    });
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'Hecho', {
      duration: 5 * 1000
    })

  }
}
