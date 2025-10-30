import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API = environment.production ? 'https://srida-backend.onrender.com/api' : '/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  checkHealth() {
    return this.http.get(`${API}/health`);
  }
}