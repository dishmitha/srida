import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  createBooking(payload: { product: string }): Observable<any> {
    return this.http.post(`${API}/bookings`, payload);
  }

  getMyBookings(): Observable<any> {
    return this.http.get(`${API}/bookings/my`);
  }
}
