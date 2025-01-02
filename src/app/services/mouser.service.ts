import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class MouserService {
  http = inject(HttpClient);
  apiKey: string = '4f14c1fc-66a3-4e19-9511-c7ebbee14279';
  apiUrlSearch: string = 'https://api.mouser.com/api/v1/search/keyword';
  apiUrlManufacturers: string =
    'https://api.mouser.com/api/v2/search/manufacturerlist';

  // BehaviorSubject для хранения и передачи данных
  private productDataSubject = new BehaviorSubject<any>(null);
  private manufacturersSubject = new BehaviorSubject<any>(null);

  // Observable, на который могут подписываться другие компоненты
  productData$ = this.productDataSubject.asObservable();
  manufacturers$ = this.manufacturersSubject.asObservable();

  // Метод для обновления данных
  setProductData(data: any): void {
    this.productDataSubject.next(data);
  }
  setManufacturers(data: any): void {
    this.manufacturersSubject.next(data);
  }

  postProducts(keyword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'text/json',
    });

    const body = {
      SearchByKeywordRequest: {
        keyword: keyword,
        records: 10,
        startingRecord: 0,
        searchOptions: 'string',
        searchWithYourSignUpLanguage: true,
      },
    };

    return this.http.post(`${this.apiUrlSearch}?apiKey=${this.apiKey}`, body, {
      headers,
    });
  }
  getManufacturers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'text/json',
    });
    return this.http.get(`${this.apiUrlManufacturers}?apiKey=${this.apiKey}`, {
      headers,
    });
  }
  // getManufacturersLogos(): Observable<Logos[]> {
  // return this.http.get<Logos[]>('assets/logos.json');
  // }
}
