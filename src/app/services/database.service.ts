import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  http = inject(HttpClient);
  dbUrl: string = 'http://localhost:3000/users';
  jsonDbUrl: string = 'https://jsonplaceholder.typicode.com/users';
  constructor() {}
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonDbUrl);
  }
  getUser(): Observable<User> {
    return this.http.get<User>(this.dbUrl);
  }
  addUser(user: User): Observable<User> {
    return this.http.get<User[]>(this.dbUrl).pipe(
      map((users) => {
        const maxId =
          users.length > 0 ? Math.max(...users.map((u) => u.id || 0)) : 0;
        user.id = maxId + 1;
        return user;
      }),
      switchMap((newUser) => this.http.post<User>(this.dbUrl, newUser))
    );
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dbUrl);
  }
  
}
