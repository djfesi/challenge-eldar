import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { selectUserRole } from '../store/auth/auth.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RoleAdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserRole).pipe(
      map((role) => {
        if (role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/main']);
          return false;
        }
      })
    );
  }
}
