import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  username: string = '';
  fullName: string = '';
  password: string = '';
  email: string = '';
  ngOnInit(): void {
     this.username = this.auth.username;
     this.fullName = this.auth.fullname;
     this.password = this.auth.password;
     this.email = this.auth.email;
  }

}
