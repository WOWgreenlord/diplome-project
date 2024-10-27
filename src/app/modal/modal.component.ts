import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  database = inject(DatabaseService);
  auth = inject(AuthService);
  loginError: string = '';

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  });

  closeModal() {
    this.close.emit();
  }
  onSubmit() {
    const { username, email } = this.profileForm.value;
    if (username && email) {
      this.database.getUser(username, email).subscribe((user) => {
        if (user) {
          this.auth.setUser(user.name);
          this.loginError = '';
          this.closeModal();
        } else {
          this.loginError = 'Неверный username или email';
        }
      });
    } else {
      this.loginError = 'Заполните все поля';
    }
  }
}
