import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

// import { Firestore } from '@angular/fire/firestore';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, docData, setDoc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { UserTap } from '../interfaces/user-tap';
import { getDoc } from 'firebase/firestore';
import { Credit } from '../interfaces/credit';
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  public nameColletionUsersSamari:string = 'usersSamari'
  constructor(
    private auth: Auth,
    private firebase : Firestore
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
   }

 

   loginWithGoogle(): Observable<any> {
    const googleProvider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, googleProvider)).pipe(
      switchMap((result) => {
        const user = result.user;
        const userRef = doc(this.firebase, `usersSamari/${user.uid}`);
  
        return from(getDoc(userRef)).pipe(
          switchMap((docSnapshot) => {
            if (docSnapshot.exists()) {
              return of(user);
            } else {
              const userData: UserTap = {
                uid: user.uid,
                displayName: user.displayName ?? '',
                email: user.email ?? '',
                photoURL: user.photoURL,
                role: 'free',
                create: new Date()
              };
              return from(setDoc(userRef, userData)).pipe(map(() => user));
            }
          })
        );
      }),
      catchError((error) => {
        console.error('Error during Google login:', error);
        return throwError(() => error);  // Propaga el error para ser manejado en el componente
      })
    );
  }
  

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  saveUserInfo(user:UserTap){
  const userColletion = collection(this.firebase, `${this.nameColletionUsersSamari}` )
    return from(addDoc(userColletion, user))
  }

  addOneCredit(method: 'paypal' | 'stripe' | 'other', credit:Credit, period: 'monthly' | 'annual'): Observable<string> {
    return this.currentUser$.pipe(
      switchMap((userData) => {
        if (userData?.uid) {
          const userRef = doc(this.firebase, `${this.nameColletionUsersSamari}/${userData.uid}`);
          // Obtener el documento actual del usuario
          return from(getDoc(userRef)).pipe(
            switchMap((docSnap) => {
              if (docSnap.exists()) {
                const userTap = docSnap.data() as UserTap;
                const currentCredits = userTap.credits || [];
  
                // Crear un nuevo array con la información consolidada de los créditos
                const updatedCredits = [
                  ...currentCredits,  // Mantener los créditos existentes
                  credit  // Añadir el nuevo crédito con la información consolidada
                ];
  
                // Actualizar el documento con la nueva información de créditos
                return from(updateDoc(userRef, { credits: updatedCredits })).pipe(
                  switchMap(() => {
                    return from(Promise.resolve('Créditos actualizados con éxito'));
                  })
                );
              } else {
                return throwError(() => new Error('No se encontró el documento del usuario'));
              }
            }),
            catchError((error) => throwError(() => new Error(`Error al obtener el documento: ${error.message}`)))
          );
        } else {
          return throwError(() => new Error('No se pudo obtener el UID del usuario'));
        }
      }),
      catchError((error) => throwError(() => new Error(`Error al suscribir al usuario: ${error.message}`)))
    );
  }
  

  removeOneCredit(idpay: string): Observable<string> {
    return this.currentUser$.pipe(
      switchMap((userData) => {
        if (userData?.uid) {
          const userRef = doc(this.firebase, `${this.nameColletionUsersSamari}/${userData.uid}`);
          // Obtener el documento actual del usuario
          return from(getDoc(userRef)).pipe(
            switchMap((docSnap) => {
              if (docSnap.exists()) {
                const userTap = docSnap.data() as UserTap;
                let currentCredits = userTap.credits || [];
  
                // Buscar y remover el crédito con el idPay especificado
                const findCredit = currentCredits.find(credit => credit.idPay === idpay);
                if (findCredit) {
                  // Filtrar el crédito que queremos eliminar
                  const updatedCredits = currentCredits.filter(credit => credit.idPay !== idpay);
  
                  // Actualizar el documento con los créditos restantes
                  return from(updateDoc(userRef, { credits: updatedCredits })).pipe(
                    switchMap(() => {
                      return from(Promise.resolve('Crédito eliminado con éxito'));
                    })
                  );
                } else {
                  return throwError(() => new Error('No se encontró un crédito con ese ID de pago'));
                }
              } else {
                return throwError(() => new Error('No se encontró el documento del usuario'));
              }
            }),
            catchError((error) => throwError(() => new Error(`Error al obtener el documento: ${error.message}`)))
          );
        } else {
          return throwError(() => new Error('No se pudo obtener el UID del usuario'));
        }
      }),
      catchError((error) => throwError(() => new Error(`Error al suscribir al usuario: ${error.message}`)))
    );
  }
  

  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((result) => {
        const user = result.user;
        const userDocRef = doc(this.firebase, `${this.nameColletionUsersSamari}/${user.uid}`);
  
        return from(getDoc(userDocRef)).pipe(
          switchMap((docSnapshot) => {
            if (!docSnapshot.exists()) {
              const newUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                role: 'free',
                create: new Date()
              };
              return from(setDoc(userDocRef, newUser)).pipe(
                map(() => newUser)
              );
            } else {
              return of(user);
            }
          })
        );
      }),
      catchError((error) => {
        console.error('Error during sign-up:', error);
        return throwError(() => error);  // Propaga el error para ser manejado en el componente
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((result) => {
        console.log('Resultado de la autenticación:', result);
      }),
      map((result) => result.user), // Devolver el usuario autenticado
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(() => error);  // Propaga el error al componente
      })
    );
  }  
  getInfoUser(uid: string){
    const docRef = doc(this.firebase, `${this.nameColletionUsersSamari}/${uid}`)
    return from(docData(docRef, {idField: 'id'}))
  }
}
