import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSource = new BehaviorSubject<string>('Выполните вход');
  currentUser$ = this.userSource.asObservable();
  constructor() {}

  setUser(name: string) {
    this.userSource.next(name);
  }
  clearUser() {
    this.userSource.next('Выполните вход');
  }
}
