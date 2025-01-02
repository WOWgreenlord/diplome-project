import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToshibaService {
  http = inject(HttpClient);
  apiKey: string =
    '53dfd60847e7c604af1ed239741236b188942917d5a374d166e1dbd204c99834';
  url: string = 'https://toshiba.semicon-storage.com/webapi/products/latest';

  postProducts(category: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      const body = {
        category: category
      };
  
      return this.http.post(`${this.url}?apiKey=${this.apiKey}`, body, {
        headers,
      });
    }
  constructor() {}
}
