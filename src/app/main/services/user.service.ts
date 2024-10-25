import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/dev';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsers(
    searchTerm?: string
  ): Observable<IUser[]> {
    let params = new HttpParams()
    if (searchTerm) {
      params = params.set('q', searchTerm);
    }
    return this.http.get<IUser[]>(`${this.apiUrl}/users`, { params });
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${userId}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
