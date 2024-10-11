import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, UploadTask, deleteObject } from '@angular/fire/storage';
import { BehaviorSubject, Observable, Subject, catchError, from, map, tap } from 'rxjs';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, docData, setDoc, DocumentReference, DocumentData} from '@angular/fire/firestore';
import {  query, where } from 'firebase/firestore';
import { Categories } from '../interfaces/categories';
import { Product } from '../interfaces/product';
import { BusinessInformation } from '../interfaces/business-information';
@Injectable({
  providedIn: 'root'
})
export class DemoService {

  private currentUploadTask: UploadTask | null = null;
  private imageUploadUrl: string | null = null;
  private filePath: string = ''
  nameColletionBussinesDemo: string = 'bussinessDemo';
  nameLocalStorageDemoBussiness: string = this.nameColletionBussinesDemo;
  
  nameColletionListProductDemo: string = 'products';

  nameColletionSurvey: string = 'surveyService'

  nameColletionListCategoriesDemo: string = 'categories';
 
  idBusiness: string  | null = null;

  currentMenuSubject: BehaviorSubject<BusinessInformation | null> = new BehaviorSubject<BusinessInformation | null>(null);
  currentMene$: Observable<BusinessInformation | null> = this.currentMenuSubject.asObservable();
  
  constructor(
    private storage: Storage,
    private firestore: Firestore,
  ) {}

  setIdBusiness(idBu: string){
    this.idBusiness = idBu
  }

  

  deleteBusiness(idBu:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}` )
    return deleteDoc(docRef)
  }

  getListBusinessListForUser(idUser:string){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}`);
    const queryRef = query( colletionRef , where('idUSer', '==', idUser));
    return from(collectionData(queryRef, { idField: 'id' }));
  }


  getSurveys(idBu:string){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionSurvey}`)

    return from(collectionData(colletionRef, {idField: 'id'}))

  }

  deleteSurvey(idBu:string, idSurvey:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}/${this.nameColletionSurvey}/${idSurvey}`)
    return deleteDoc(docRef)
  }



  async addCategory(idBUssiness: string, category: Categories) {
    const categoriesCollection = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBUssiness}/${this.nameColletionListCategoriesDemo}`);
    
    return await addDoc(categoriesCollection, category)
      .then((docRef) => {
        // Añadir el ID generado al objeto de la categoría
        return { ...category, id: docRef.id };
      });
  }

  desactiveProduct(idBussines:string, idProduct:string, status:boolean){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}/${this.nameColletionListProductDemo}/${idProduct}`)
    return updateDoc(docRef, {status:status})
     
  }

  async updateCategory(idBussines: string, idcategory: string, categoryy: Categories) {
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}/${this.nameColletionListCategoriesDemo}/${idcategory}`);
  
    // Asegúrate de que categoryy sea un objeto plano
    return from(updateDoc(docRef, { ...categoryy} )).pipe(
      map(() => {
        return { id: docRef.id, ...categoryy };
      }),
      catchError((error) => {
        console.error('Error al actualizar el documento:', error);
        throw error;
      })
    );
  }

  updateProductCategory(idProduct:string, idCategoryNew:string, idBussines:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}/${this.nameColletionListProductDemo}/${idProduct}`)
    return from(updateDoc(docRef, {idSection:idCategoryNew})).pipe(
      map(changes=>{
        return {id:docRef.id, ...{idSection:idCategoryNew}};

      }),
      catchError((error)=>{
        console.error('Error al actualizar el documento:', error);
        throw error;
      })
    )
  }

  updateProduct(idProduct:string, idBussines:string, product:Product){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}/${this.nameColletionListProductDemo}/${idProduct}` )
    return from(updateDoc(docRef, {...product} )).pipe(
      map(()=>{
        return {id:docRef.id, ...product};
      }),
      catchError((error)=>{
        console.error('Error al actualizar el documento:', error);
        throw error;
      })
    )
  }

  updatePositionCategory(idBussines:string, idCategory:string, newPosition:number){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}/${this.nameColletionListCategoriesDemo}/${idCategory}`);
    return from(updateDoc(docRef, {position: newPosition} ))
  }

  getBussiness(idBUssiness: string) {
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBUssiness}`);
    this.setIdBusiness(idBUssiness)
    return from(docData(docRef, { idField: 'id' })).pipe(
      tap((menu: BusinessInformation) => {
        // Actualiza el currentMenuSubject con los datos obtenidos
        this.currentMenuSubject.next(menu);
      })
    );
  }

  getCategoryList(idBussiness: string) {
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBussiness}/${this.nameColletionListCategoriesDemo}`);
    
    // Usa collectionData con la opción { idField: 'id' } para agregar el id al objeto de categoría
    return from(collectionData(colletionRef, { idField: 'id' }) ).pipe(
      map((categories: any[]) => {
        return categories; // Ahora cada categoría tiene un campo `id`
      }),
      catchError((error) => {
        console.error('Error al recuperar la lista de categorías:', error);
        throw error;
      })
    );
  }

  getListProducts(idBussines:string){
    const colletionRef = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}/${this.nameColletionListProductDemo}`)
  return from(collectionData(colletionRef,  { idField: 'id' })).pipe(
    map((products)=>{
      return products
    }),
    catchError((error)=>{
      console.error('Error al recuperar la lista de productos:', error);
        throw error;
    })
  )
  }


  addProduct(idBussinesDemo:string, produc: Product): Promise<DocumentReference<DocumentData>> {
    const productColletion = collection(this.firestore, `${this.nameColletionBussinesDemo}/${idBussinesDemo}/${this.nameColletionListProductDemo}`)
    return addDoc(productColletion, produc)
  }




  createBussinessWithName(name: string) {
    const bussinessCollection = collection(this.firestore, this.nameColletionBussinesDemo);
    const newDocRef = doc(bussinessCollection); // Referencia del documento, genera automáticamente un ID único.
    const bussiness: BusinessInformation = {
      nameCompany: name,
      create: new Date(),
    };
  
    return from(setDoc(newDocRef, bussiness)).pipe(
      map(() => {
        return { id: newDocRef.id, ...bussiness }; // Retorna el ID del documento y los datos del negocio.
      }),
      catchError((error) => {
        console.error('Error al crear el documento:', error);
        throw error;
      })
    );
  }
  updateBussiness(idBussines:string, infi:BusinessInformation){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBussines}`);

    const updateData = { ...infi };
    return from(updateDoc(docRef, updateData))
  }

  updateColorBusiness(idBUssiness:string, nameColor: 'principalColor' | 'secondaryColor' | 'terciaryColor', color:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBUssiness}`)
    switch(nameColor){
      case 'principalColor':
        return from(updateDoc(docRef, {principalColor: color} ));
      case 'secondaryColor':
        return from(updateDoc(docRef, {secondaryColor: color} ));
      case 'terciaryColor':
        return from(updateDoc(docRef, {terciaryColor: color} ))
    }
  }

  updateIDMenuSelectedBUsiness(idBu:string, idMenu:string){
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}`)
    return from(updateDoc(docRef, {idMenu:idMenu} ))

  }

  updateBussinessWithName(idBu: string, buss: BusinessInformation) {
    const docRef = doc(this.firestore, `${this.nameColletionBussinesDemo}/${idBu}`);

    const updateData = { ...buss };
    return from( updateDoc(docRef, updateData)).pipe(
      map(() => {
        return { id: docRef.id, ...buss };
      }),
      catchError((error) => {
        console.error('Error al actualizar el documento:', error);
        throw error;
      })
    );
  }

  startUpload(file: File, idBussines: string, localaded: 'category' | 'product'): Subject<{ progress: number, downloadURL?: string, filePath?: string }> {
    const progress$ = new Subject<{ progress: number, downloadURL?: string, filePath?: string }>();
    const filePath = `menu_images/${idBussines}/${localaded}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    this.currentUploadTask = uploadBytesResumable(storageRef, file);

    this.currentUploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress$.next({ progress });
      },
      (error) => {
        progress$.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(this.currentUploadTask!.snapshot.ref);
        this.imageUploadUrl = downloadURL;
        progress$.next({ progress: 100, downloadURL, filePath });
        progress$.complete();
      }
    );

    return progress$;
  }



  getDownloadUrl(): string | null {
    return this.imageUploadUrl;
  }



  cancelUpload(): void {
    if (this.currentUploadTask) {
      this.currentUploadTask.cancel();
      this.currentUploadTask = null;
      this.imageUploadUrl = null;
    }
  }



  deleteProduct(idBussiness:string, idProduct:string){
    const docRef = doc(this.firestore,
       `${this.nameColletionBussinesDemo}/${idBussiness}/${this.nameColletionListProductDemo}/${idProduct}`)
    return deleteDoc(docRef)
  }

  deleteCategory(idBussinesDemo:string, idCategory:string){
    const docRef = doc(this.firestore, 
      `${this.nameColletionBussinesDemo}/${idBussinesDemo}/${this.nameColletionListCategoriesDemo}/${idCategory}`
    )
    return deleteDoc(docRef)
  }



  deleteFile(filePath: string): Promise<void> {
    const fileRef = ref(this.storage, filePath);
    return deleteObject(fileRef);
  }

  createMenuWithNameAndIdUser(name: string, idUser: string){
    const menuColletion = collection(this.firestore, this.nameColletionBussinesDemo)
    const menu : BusinessInformation = {
      nameCompany: name,
      create: new Date(),
      idUSer: idUser,
    };

    return from(addDoc(menuColletion, menu))
    
  }

  
}
