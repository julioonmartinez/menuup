import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { combineLatest, from, map, Observable, switchMap } from 'rxjs';
import { Product } from '../interfaces/product';
import { BusinessInformation } from '../interfaces/business-information';

@Injectable({
  providedIn: 'root'
})
export class GeneralAppService {

  nameColletionBussinesDemo: string = 'bussinessDemo';
  nameLocalStorageDemoBussiness: string = this.nameColletionBussinesDemo;
  
  nameColletionListProductDemo: string = 'products';
  nameLocalStorageProductsDemo:string = this.nameColletionListProductDemo;

  nameColletionListCategoriesDemo: string = 'categories';
  

  constructor(
    private firestore : Firestore,
  ) { }


  getBusinessActive(){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}`)

    return from(collectionData(colletionRef, {idField: 'id'}))
  }

  deleteBusiness(idBu:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}` )
    return deleteDoc(docRef)
  }

  getProductList(idBu:string){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionListProductDemo}`)
    return from(collectionData(colletionRef,{idField: 'id'}))
  }
  getProductListByFeed(): Observable<Product[]> {
    const businessCollections = collection(this.firestore, this.nameColletionBussinesDemo);
  
    return from(collectionData(businessCollections, { idField: 'id' }))
      .pipe(
        switchMap((businesses: BusinessInformation[]) => {
          // Create an array of observables for each business's products
          const productObservables = businesses.map((business: BusinessInformation) => {
            const productsCollection = collection(this.firestore, `${this.nameColletionBussinesDemo}/${business.id}/${this.nameColletionListProductDemo}`);
            return from(collectionData(productsCollection, { idField: 'id' }))
              .pipe(
                map(products => {
                  // Barajear todos los productos antes de tomar los primeros 5
                  this.shuffle(products);
                  return products.slice(0, 5);
                })
              );
          });
  
          // Combinar los observables y retornar una lista plana de productos
          return combineLatest(productObservables).pipe(
            map(productLists => productLists.flat())
          );
        })
      );
  }

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];   
  
    }
  }


  getCategories(idBu:string){
    const collectionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionListCategoriesDemo}`)
    return from(collectionData(collectionRef, {idField: 'id'}))
  }



}
