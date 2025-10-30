import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: { name: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post(`${API}/auth/register`, payload);
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API}/auth/login`, payload);
  }

  setToken(token: string) {
    localStorage.setItem('srida_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('srida_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
