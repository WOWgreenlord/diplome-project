import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Category } from '../interfaces/Category';
import { Vendor } from '../interfaces/Vendor';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class TreolanService {
  private http = inject(HttpClient);
  constructor() {}
  url: string = 'http://localhost:3000/api/categories'; // Прокси будет заменять это на https://demo-api.treolan.ru


  postCaregories(login: string, password: string): Observable<any> {
    let myHeaders = new HttpHeaders().set('Content-Type', 'application/json'); // Преобразуем в JSON
    let body = { login, password };

    return this.http.post(this.url, body, { headers: myHeaders });
  }
}
