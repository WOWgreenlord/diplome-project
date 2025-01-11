import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../interfaces/Cart';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class MouserCartService {
  http = inject(HttpClient);
  cartKey: string = '4f14c1fc-66a3-4e19-9511-c7ebbee14279';
  apiKey: string = '7b1da928-65d7-4368-85e3-7d83e94ff673';

  cartUrl: string = '/api/v1/cart';
  cartInsertUrl: string = '/api/v1/cart/items/insert';
  cartRemoveUrl: string = '/api/v1/cart/item/remove';

  cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();

  getCart(): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('cartKey', this.cartKey);

    return this.http.get(this.cartUrl, { params });
  }
  getCartData(): any {
    return this.cart$;
  }
  addToCart(product: Product, quantity: number): Observable<any> {
    const url = `${this.cartInsertUrl}?apiKey=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const body = {
      CartKey: this.cartKey,
      CartItems: [
        {
          MouserPartNumber: product.MouserPartNumber,
          Quantity: quantity,
          CustomerPartNumber: '',
          PackagingChoice: 'None',
        },
      ],
    };
    this.cart.push(product);
    this.cartSubject.next(this.cart);

    return this.http.post<any>(url, body, { headers });
  }
  removeItemFromCart(mouserPartNumber: string): Observable<any> {
    // const url = `${this.baseUrl}/item/remove`;
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('cartKey', this.cartKey)
      .set('mouserPartNumber', mouserPartNumber);

    return this.http.post(this.cartRemoveUrl, null, { params });
  }
}
