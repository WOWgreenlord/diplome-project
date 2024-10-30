import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Token } from '../interfaces/Token';
import { TreolanService } from '../services/treolan.service';
import { DatabaseService } from '../services/database.service';
import { User } from '../interfaces/User';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../services/auth.service';

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
  token: Token | null = null;
  isDark: boolean = false;
  isModalOpen: boolean = false;
  logIn: string = 'Выполните вход';
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
  }
  darkTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
}
