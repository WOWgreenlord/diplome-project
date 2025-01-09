import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root',
})
export class MouserCartService {
  http = inject(HttpClient);
  cartKey: string = '4f14c1fc-66a3-4e19-9511-c7ebbee14279';
  apiKey: string = '7b1da928-65d7-4368-85e3-7d83e94ff673';

  cartUrl: string = '/api/v1/cart';
  cartInsertUrl: string = '/api/v1/cart/items/insert';

  getCart(): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('cartKey', this.cartKey);

    return this.http.get(this.cartUrl, { params });
  }

}
