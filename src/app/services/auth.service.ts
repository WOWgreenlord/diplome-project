import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged$ = new BehaviorSubject<boolean>(false);
  // private userSource = new BehaviorSubject<string>('Выполните вход');
  public currentUser$ = new BehaviorSubject<string>('');
  private userName: string = '';
  get username(): string {
    return this.userName;
  }

  constructor() {}

  setUser(name: string) {
    // this.userSource.next(name);
    this.userName = name;
    this.isLogged$.next(true);
  }

  logOut() {
    // this.userSource.next('Выполните вход');
    console.log('vihod');
    this.isLogged$.next(false);
  }
}
