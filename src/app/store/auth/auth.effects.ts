import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((response) =>
            loginSuccess({
              email: response.email,
              token: response.token,
              role: response.role,
            })
          ),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
