import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      projectId: 'menu-app-c542c',
      appId: '1:556872637819:web:f21d3ebd8a6f5ca45bb1de',
      storageBucket: 'menu-app-c542c.appspot.com',
      apiKey: 'AIzaSyDUXTexxqM90lzT0AxMDagooE50gP_sIeE',
      authDomain: 'menu-app-c542c.firebaseapp.com',
      messagingSenderId: '556872637819',
      measurementId: 'G-KEQ647P1S2'
    })),
    provideFirestore(() => getFirestore()), provideAnimationsAsync()
  ]
};
