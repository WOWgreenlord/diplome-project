import { Component, inject, OnInit } from '@angular/core';

import { Token } from '../interfaces/Token';
import { TreolanService } from '../services/treolan.service';
import { DatabaseService } from '../services/database.service';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  treolan = inject(TreolanService);
  database = inject(DatabaseService);
  token: Token | null = null;
  isDark: boolean = false;
  users: User[] = [];
  newUser = {
    name: 'Ivan Ivanov',
    username: 'Vano',
    email: 'vano.ivanov@yandex.u'
  }

  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      // console.log('Token from header component:', token.access_token)
    });
    this.database.getAllUsers().subscribe(response => {
      console.log(response);
      this.users = response;
    })
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
    this.database.addUser(this.newUser).subscribe(response => {
      console.log('User added:', response)
    })
    this.database.getAllUsers().subscribe(allUsers => {
      console.log(allUsers)
    })
  }
}
