import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { from } from 'rxjs';

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

  getCategories(idBu:string){
    const collectionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionListCategoriesDemo}`)
    return from(collectionData(collectionRef, {idField: 'id'}))
  }



}
