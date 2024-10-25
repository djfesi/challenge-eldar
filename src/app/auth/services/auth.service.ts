import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MOCK_USERS } from '../mocks/mock-users';
import { jwtDecode } from 'jwt-decode';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../../store/auth/auth.actions';
import { environment } from '../../../enviroments/dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly secretKey = environment.secretKey;

  constructor(private router: Router, private store: Store) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    const user = MOCK_USERS.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const token = this.generateToken(user.email, user.role, 3600);
      this.store.dispatch(
        loginSuccess({ email: user.email, token, role: user.role })
      );
      return of({ token, role: user.role });
    }
    return throwError(() => new Error('Credenciales incorrectas'));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.secretKey);
  }

  getDataToken(tag: string): any | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded ? decoded[tag] : null;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  private generateToken(
    email: string,
    role: string,
    expiresIn: number = 3600
  ): string {
    const payload = {
      email,
      role,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    };
    const base64Payload = btoa(JSON.stringify(payload));
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    return `${header}.${base64Payload}.signature`;
  }
}
