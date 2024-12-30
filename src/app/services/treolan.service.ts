import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import { Category } from '../interfaces/Category';
import { Vendor } from '../interfaces/Vendor';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class TreolanService {
  private http = inject(HttpClient);
  constructor() {}
  urlCategories: string = 'http://localhost:3000/api/categories'; // Прокси будет заменять это на https://demo-api.treolan.ru
  urlProductInfo: string = 'http://localhost:3000/api/product-info'; // URL для запроса информации о товаре
  urlGenCatalog: string = 'http://localhost:3000/api/gen-catalog'; // URL для генерации каталога

  postCaregories(login: string, password: string): Observable<any> {
    let myHeaders = new HttpHeaders().set('Content-Type', 'application/json'); // Преобразуем в JSON
    let body = { login, password };

    return this.http.post(this.urlCategories, body, { headers: myHeaders });
  }

  postProductInfo(
    login: string,
    password: string,
    articul: string
  ): Observable<any> {
    let myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let body = { login, password, articul };

    return this.http.post(this.urlProductInfo, body, { headers: myHeaders });
  }

  postGenCatalog(
    login: string,
    password: string,
    categoryIds: string[]
  ): Observable<any> {
    const body = {
      login,
      password,
      categoryIds,
    };
    return this.http.post('http://localhost:3000/api/gen-catalog', body);
  }

  // Хранение выбранных категорий с использованием BehaviorSubject
  private selectedCategoriesSource = new BehaviorSubject<Category[]>([]);
  selectedCategories$ = this.selectedCategoriesSource.asObservable();

  // Обновление выбранных категорий
  updateSelectedCategories(categories: Category[]) {
    this.selectedCategoriesSource.next(categories);
  }
}