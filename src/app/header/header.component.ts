import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Token } from '../interfaces/Token';
import { User } from '../interfaces/User';

import { TreolanService } from '../services/treolan.service';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RatesService } from '../services/rates.service';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  treolan = inject(TreolanService);
  database = inject(DatabaseService);
  auth = inject(AuthService);
  rates = inject(RatesService);
  token: Token | null = null;
  isDark: boolean = false;
  isModalOpen: boolean = false;
  isToggled: boolean = false;
  DarkTheme: string = 'Темную тему'
  logIn: string = 'Выполните вход';
  ratesEUR: number = 0;
  users: User[] = [];
  newUser = {
    name: 'Ivan Ivanov',
    username: 'Vano',
    email: 'vano.ivanov@yandex.u',
    password: '123'
  };

  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      // console.log('Token from header component:', token.access_token)
    });
    this.database.getAllUsers().subscribe((response) => {
      console.log(response);
      this.users = response;
    });
    this.auth.currentUser$.subscribe((name) => {
      this.logIn = name;
    });
    // this.rates.getRates().subscribe(response => {
    //   this.ratesEUR = response.rates.RUB;
    //   this.ratesEUR = +this.ratesEUR.toFixed(2);
    // })
  }
  darkTheme() {
    this.isDark = !this.isDark;
    if (this.isDark && this.DarkTheme) {
      document.documentElement.classList.add('dark');
      this.DarkTheme = 'Светлую тему'
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
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  toggle() {
    if(this.isToggled === false) {
      this.isToggled = true
    } else {
      this.isToggled = false;
    }
  }
}
