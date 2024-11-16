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
  private eMail: string = '';
  private fullName: string = '';
  get username(): string {
    return this.userName;
  }
  get email(): string {
    return this.eMail;
  }
  get fullname(): string {
    return this.fullName;
  }
  

  constructor() {}

  setUser(name: string) {
    // this.userSource.next(name);
    this.userName = name;
    this.isLogged$.next(true);
  }
  setEmail(email: string) {
    this.eMail = email;
  }
  setUserFullname(fullname: string) {
    this.fullName = fullname;
  }

  logOut() {
    // this.userSource.next('Выполните вход');
    console.log('vihod');
    this.isLogged$.next(false);
  }
}
