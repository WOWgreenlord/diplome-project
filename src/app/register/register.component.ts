import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // router = inject(Router);
  @Output() close = new EventEmitter<void>();
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

}
