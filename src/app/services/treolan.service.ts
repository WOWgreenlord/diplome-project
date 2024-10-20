import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import { Token } from '../interfaces/Token';

@Injectable({
  providedIn: 'root',
})
export class TreolanService {
  private http = inject(HttpClient);
  private tokenSubject = new Subject<Token>();
  token$: Observable<Token> = this.tokenSubject.asObservable();
  tokenUrl: string = 'https://demo.treolan.ru/api/oauth2/token';
  
  constructor() {}
  postToken(
    password: string,
    clientSecret: string,
    username: string,
    clientId: string
  ): Observable<Token> {
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
}
