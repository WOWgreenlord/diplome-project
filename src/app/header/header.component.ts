import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { Token } from '../interfaces/Token';
import { User } from '../interfaces/User';

import { TreolanService } from '../services/treolan.service';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RatesService } from '../services/rates.service';

import { ModalComponent } from '../modal/modal.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, NavComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  treolan = inject(TreolanService);
  database = inject(DatabaseService);
  auth = inject(AuthService);
  rates = inject(RatesService);
  destroyRef = inject(DestroyRef);
  token: Token | null = null;
  isDark: boolean = false;
  isModalOpen: boolean = false;
  isModalInfoOpen: boolean = false;
  isToggled: boolean = false;
  isLogged: boolean = false;
  DarkTheme: string = 'Темную тему';
  logIn: string = 'Выполните вход';
  ratesEUR: number = 0;
  ratesUSD: number = 0;
  users: User[] = [];
  categoryId: number = 0;
  newUser = {
    name: 'Ivan Ivanov',
    username: 'Vano',
    email: 'vano.ivanov@yandex.u',
    password: '123',
  };
  constructor() {}

  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      // console.log('Token from header component:', token.access_token)
    });
    this.database.getAllUsers().subscribe((response) => {
      // console.log(response); Получение всех пользователей
      this.users = response;
    });
    this.auth.isLogged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        // console.log(value)
        this.isLogged = value;
        this.logIn = value ? this.auth.username : 'Выполните вход';
      });
    // this.rates.getRatesUSD().subscribe(data => {
    //   this.ratesUSD = data.data.RUB
    //   this.ratesUSD = +this.ratesUSD.toFixed(2);
    //   console.log(data.data.RUB)
    // })
    // this.rates.getRatesEUR().subscribe(data => {
    //   this.ratesEUR = data.data.RUB
    //   this.ratesEUR = +this.ratesEUR.toFixed(2);
    //   console.log(`EUR TO RUB:${data.data.RUB}`)
    // })
  }
  darkTheme() {
    this.isDark = !this.isDark;
    if (this.isDark && this.DarkTheme) {
      document.documentElement.classList.add('dark');
      this.DarkTheme = 'Светлую тему';
    } else {
      document.documentElement.classList.remove('dark');
      this.DarkTheme = 'Темную тему';
    }
  }
  addUser() {
    this.database.addUser(this.newUser).subscribe((response) => {
      console.log('User added:', response);
    });
    this.database.getAllUsers().subscribe((allUsers) => {
      console.log(allUsers);
    });
  }
  openModal() {
    if (this.isLogged) {
      this.showAccountInfo();
    } else {
      this.isModalOpen = true;
    }
  }
  openModalInfo() {
    this.isModalInfoOpen = true;
    // this.isModalOpen = true;
  }
  showAccountInfo() {
    console.log('Информация об аккаунте:', this.auth.username);
  }
  closeModal() {
    this.isModalOpen = false;
    this.isModalInfoOpen = false;
  }
  toggle() {
    if (this.isToggled === false) {
      this.isToggled = true;
    } else {
      this.isToggled = false;
    }
  }
  logoutClick() {
    this.auth.logOut();
    console.log('vihod header');
  }
  // getProduct() {
  //   this.treolan.getProducts(this.token!.access_token).subscribe(response => {
  //     console.log(response)
  //   })
  // }
  getProductsByCategory() {
    this.treolan.getProducts(this.token!.access_token, this.categoryId).subscribe(response => {
      console.log(response);
    })
  }
}
