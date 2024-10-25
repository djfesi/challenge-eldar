import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { selectAuthToken } from '../store/auth/auth.selectors';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAuthToken).pipe(
      map((token) => {
        if (token && !this.authService.isTokenExpired(token)) {
          return true;
        }
        this.router.navigate(['/auth']);
        return false;
      })
    );
  }
}
