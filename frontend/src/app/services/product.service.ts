import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(categoryId?: string): Observable<any> {
    const q = categoryId ? `?category=${categoryId}` : '';
    return this.http.get(`${API}/products${q}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${API}/products/${id}`);
  }

  create(product: any): Observable<any> {
    return this.http.post(`${API}/products`, product);
  }
}
