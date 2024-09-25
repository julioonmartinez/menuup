import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject, from, map, Observable, of, switchMap, tap } from 'rxjs';

// import { Firestore } from '@angular/fire/firestore';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, docData, setDoc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { UserTap } from '../interfaces/user-tap';
import { getDoc } from 'firebase/firestore';
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
      tap((result) => {
        console.log('Resultado de la autenticación:', result);
      }),
      switchMap((result) => {
        const user = result.user;
        const userRef = doc(this.firebase, `usersSamari/${user.uid}`);
  
        // Verificar si el usuario ya está registrado en Firestore
        return from(getDoc(userRef)).pipe(
          switchMap((docSnapshot) => {
            if (docSnapshot.exists()) {
              console.log('Usuario ya registrado, no se guarda nuevamente.');
              return of(user); // Ya registrado, solo regresamos el usuario
            } else {
              // Guardar el nuevo usuario en Firestore
              const userData : UserTap = {
                uid: user.uid,
                displayName: user.displayName != null ? user.displayName : '',
                email: user.email != null ? user.email : '' ,
                photoURL: user.photoURL,
                role: 'free',
                create: new Date()
              };
              console.log('Registrando nuevo usuario:', userData);
              return from(setDoc(userRef, userData)).pipe(map(() => user));
            }
          })
        );
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

  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((result) => {
        const user = result.user;
        const userDocRef = doc(this.firebase, `users/${user.uid}`);

        // Verificar si el usuario ya está en Firestore
        return from(getDoc(userDocRef)).pipe(
          switchMap((docSnapshot) => {
            if (!docSnapshot.exists()) {
              // Si no existe, guardar el usuario en Firestore
              const newUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                role: 'free', // Definir el rol por defecto
                create: new Date()
              };

              return from(setDoc(userDocRef, newUser)).pipe(
                map(() => newUser) // Devolver el usuario creado
              );
            } else {
              // Si ya existe, devolver el usuario sin modificar Firestore
              return of(user);
            }
          })
        );
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((result) => {
        console.log('Resultado de la autenticación:', result);
      }),
      map((result) => result.user) // Devolver el usuario autenticado
    );
  }
}
