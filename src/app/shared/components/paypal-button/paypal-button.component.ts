import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Credit } from '../../interfaces/credit';

declare var paypal: any; // Declaramos la variable PayPal


@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [CommonModule],
  template: `<div #paypalButton></div>`,
  styleUrl: './paypal-button.component.scss'
})
export class PaypalButtonComponent implements AfterViewInit {
  @ViewChild('paypalButton', { static: true }) paypalButtonElement!: ElementRef;

  
  @Input() period: 'monthly' | 'annual' = 'monthly'; // Por defecto 'monthly';

  @Input() planIDMonthly: string = 'P-91N85478YU465272HM4DMWFI' // ID del plan de suscripción mensual
  @Input() planIDAnnual: string = 'P-6L07754650982774HM4D564I' // ID del plan de suscripción anual


  constructor(
    private router : Router,
    private authService : AuthService,
  ){}

  ngAfterViewInit(): void {
    const planID = this.period === 'monthly' ? this.planIDMonthly : this.planIDAnnual;

    paypal.Buttons({
      style: {
        color: 'blue',
        height: 52
      },
      createSubscription: (data: any, actions: any) => {
        // Crear suscripción con el plan correspondiente (mensual o anual)
        return actions.subscription.create({
          'plan_id': planID
        });
      },
      onApprove: (data: any, actions: any) => {
        const subscriptionID = data.subscriptionID;
        console.log('Suscripción aprobada con subscriptionID:', subscriptionID);
        
        const credit : Credit = {
          idPay: subscriptionID,
          method: 'paypal',
          period: this.period,
          statusCredit: 'active',
          expirationDate: this.calculateNewExpirationDate(this.period),
          lastPaymentID: subscriptionID,
          paymentMethod:'paypal',

        }

        this.authService.addOneCredit('paypal', credit, this.period).subscribe({
          next: (message) => {
            console.log(message);
            this.router.navigateByUrl(`/web/selection-menu-credit/${subscriptionID}`);
          }
        });
      },
      onError: (err: any) => {
        console.error('PayPal Checkout onError', err);
      }
    }).render(this.paypalButtonElement.nativeElement);
  };

  calculateNewExpirationDate(period: 'monthly' | 'annual'): Date {
    const currentDate = new Date();
    if (period === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return currentDate;
  }
}
