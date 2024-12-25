import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  RequiredValidator,
  FormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/User';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() isOpenInfo = false;
  @Output() close = new EventEmitter<void>();
  isRegisterOpen: boolean = false;
  isPasswordShown: boolean = false;
  router = inject(Router);
  database = inject(DatabaseService);
  auth = inject(AuthService);
  loginError: string = '';
  username: string = '';
  email: string = '';
  passwordType: string = 'password';

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
  });

  closeModal() {
    this.close.emit();
  }
  onSubmit() {
    const { email, password } = this.profileForm.value;
    if (email && password) {
      this.database.getUser(email, password).subscribe((user) => {
        if (user) {
          this.auth.setUser(user.name);
          this.auth.setEmail(user.email);
          this.auth.setUserFullname(user.username);
          this.auth.isLogged$.next(true);
          this.username = user.name;
          this.email = user.email
          this.loginError = '';
          this.closeModal();
        } else {
          this.loginError = 'Неверный email или password';
        }
      });
    } else {
      this.loginError = 'Заполните все поля';
    }
  }
  showPassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.isPasswordShown = true;
    } else {
      this.passwordType = 'password';
      this.isPasswordShown = false;
    }
  }
}
