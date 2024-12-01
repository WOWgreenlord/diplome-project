import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';

import { Token } from '../interfaces/Token';
import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class TreolanService {
  private http = inject(HttpClient);
  // создаем Subject для глобального доступа к токену для любого компонента
  private tokenSubject = new Subject<Token>();
  token$: Observable<Token> = this.tokenSubject.asObservable();
  // categoryId: number = 0;
  tokenUrl: string = 'https://demo.treolan.ru/api/oauth2/token';
  categoriesUrl: string =
    'https://demo.treolan.ru/api/1/catalog/getcategories?parentCategoryId=27512';
  vendorsUrl: string =
    'https://demo.treolan.ru/api/1/catalog/getvendors?productCategoryId=70';
  catalogSearchUrl: string =
    `https://demo.treolan.ru/api/1/catalog/search?`;
  constructor() {}
  postToken(
    password: string,
    clientSecret: string,
    username: string,
    clientId: string
  ): Observable<Token> {
    // Прокидываем параметры в запрос
    const body = new HttpParams()
      .set('password', password)
      .set('client_secret', clientSecret)
      .set('username', username)
      .set('grant_type', 'password')
      .set('client_id', clientId);

    return this.http.post<Token>(this.tokenUrl, body.toString()).pipe(
      // Передаем токен в Subject после получения.
      tap((token) => this.tokenSubject.next(token))
    );
  }
  getCategories(token: string): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http
      .get<{ data: Category[] }>(this.categoriesUrl, { headers })
      .pipe(
        // Извлекаем массив категорий из свойства `data`
        map((response) => response.data)
      );
  }
  getVendors(token: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams();
    params.set('productCategoryId', 70).set('vendorId', 0).set('inName', 0);
    return this.http.get<void>(this.vendorsUrl, { headers, params });
  }
  getProducts(token: string, categoryId: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
      .set('categoryId', categoryId)
      .set('pageSize', 10);
    return this.http.get<void>(this.catalogSearchUrl, { headers, params });
  }
}
