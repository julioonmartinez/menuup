import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { BusinessInformation } from '../interfaces/business-information';
import { query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenusUserService {
  
  nameColletionBussinesDemo: string = 'bussinessDemo';
  nameLocalStorageDemoBussiness: string = this.nameColletionBussinesDemo;
  
  nameColletionListProductDemo: string = 'products';
  nameLocalStorageProductsDemo:string = this.nameColletionListProductDemo;

  nameColletionListCategoriesDemo: string = 'categories';

  nameColletionSurvey: string = 'surveyService';


  constructor(
    private firestore : Firestore
  ) {
    
   }

  

   getMenusUser(idUser: string): Observable<BusinessInformation[]> {
    const menusRef = collection(this.firestore, `${this.nameColletionBussinesDemo}`);
    const querRef = query(menusRef, where('idUSer', '==', idUser));
  
    // Convertir la promesa en un observable y mapear los resultados
    return from(getDocs(querRef)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data() as BusinessInformation);
      })
    );
  }
}
