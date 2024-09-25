import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, catchError, from, map, Observable } from 'rxjs';
import { addDoc, query, where } from 'firebase/firestore';
import { BusinessInformation } from '../interfaces/business-information';
import { Product } from '../interfaces/product';
import { Categories } from '../interfaces/categories';
import { Survey } from '../interfaces/survey';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private businessId: string = '';

  nameColletionBussinesDemo: string = 'bussinessDemo';
  nameLocalStorageDemoBussiness: string = this.nameColletionBussinesDemo;
  
  nameColletionListProductDemo: string = 'products';
  nameLocalStorageProductsDemo:string = this.nameColletionListProductDemo;

  nameColletionListCategoriesDemo: string = 'categories';

  nameColletionSurvey: string = 'surveyService'

  noImage = 'https://firebasestorage.googleapis.com/v0/b/menu-app-c542c.appspot.com/o/web%2Fdemo-app%2Fimage_100dp_E8EAED_FILL0_wght400_GRAD0_opsz48%20(1).png?alt=media&token=4bf50080-9ea4-4dbc-9e21-ba1d0a50f4eb'

  // private businessData$: BehaviorSubject<BusinessInformation | null> = new BehaviorSubject<BusinessInformation | null>(null);

  private businessData: BehaviorSubject<BusinessInformation | null> = new BehaviorSubject<BusinessInformation | null>(null);
  public bussinesData$: Observable<BusinessInformation | null> = this.businessData.asObservable()
  constructor(
    private firestore : Firestore,
  ) { }

  setBusinessId(id: string) {
    this.businessId = id;
  }

  getBusinessId(): string {
    return this.businessId;
  }

  getBusinessDB(idBusines:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBusines}`)
    return from(docData(docRef, {idField:'id'})).pipe(
      map((bu:BusinessInformation)=>{
        this.businessData.next(bu)
        return bu
      }),
      catchError((error)=>{
        console.log('error al recuperar el bu', error)
        throw error
      })
    )
  }


  getCategoryDB(idBu:string, idCategory:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionListCategoriesDemo}/${idCategory}`)
    return from(docData(docRef, {idField: 'id'}))
  }

  getProducts(idBu:string){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionListProductDemo}`)
    return from(collectionData(colletionRef, { idField: 'id' })).pipe(
      map((products:Product[])=>{
        return products
      }),
      catchError((error)=>{
        console.error('Error al recuperar la lista de productos', error)
        throw error;
      })
    )

  }

  getProductbyCategory(idBu:string, idCategory:string){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionListProductDemo}`)
    const queryRef = query(colletionRef, where('idSection', '==' , idCategory ));
    return from(collectionData(queryRef, {idField: 'id'}))
  }

  getCategoriesLIst(idBusiness:string){
    
    const  colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBusiness}/${this.nameColletionListCategoriesDemo}` )
    return from(collectionData(colletionRef, { idField: 'id' }) ).pipe(
      map((categories: Categories[]) => {
        return categories; // Ahora cada categoría tiene un campo `id`
      }),
      catchError((error) => {
        console.error('Error al recuperar la lista de categorías:', error);
        throw error;
      })
    );
    }

    getCategoriesList02(idBusiness:string){
      console.log('cat', idBusiness)
      const  colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBusiness}/${this.nameColletionListCategoriesDemo}` )
      return collectionData(colletionRef, { idField: 'id' })
      }


      // getProduct(idProduct){
      // }

      likes( idBu:string, ){
        const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}`)
        return updateDoc(docRef, {likes: 1} )
      }

      AddSurvey(idBu : string, surve: Survey ){
        surve.create = new Date()
        const surveyColletion = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionSurvey}`)
        return addDoc(surveyColletion, surve )
      }

}

