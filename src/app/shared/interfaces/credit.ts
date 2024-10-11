export interface Credit {
         id?:string, 
         method: 'paypal' | 'stripe' | 'other',
         idPay:string,
         period: 'annual' | 'monthly',
         statusCredit: 'active' | 'expired',
         expirationDate: Date,
         lastPaymentID:string,
         paymentMethod: string,
}

