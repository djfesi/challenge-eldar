import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActionReducer, provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AuthInterceptor } from './auth/services/auth-interceptor.service';
import { routes } from './app.routes';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
  })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ReactiveFormsModule, FormsModule),
    provideStore(
      { auth: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService,
    ToastModule,
  ],
};
