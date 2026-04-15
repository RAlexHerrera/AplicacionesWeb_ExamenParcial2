import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  logout(): void {
    sessionStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userId');
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }
  registrar(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, { username, email, password });
  }
}
