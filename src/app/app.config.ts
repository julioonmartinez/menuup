import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions()
    ),
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
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ]
};
