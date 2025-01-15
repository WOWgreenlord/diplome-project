import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MouserOrderService {
  apiKey = '7b1da928-65d7-4368-85e3-7d83e94ff673';
  apiUrl: string = `/api/v1/order/?apiKey=${this.apiKey}`;

  http = inject(HttpClient);
  constructor() {}

  // Метод для отправки заказа
  createOrder(orderData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post(this.apiUrl, orderData, { headers });
  }
}
