import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MouserCartService } from '../../services/mouser-cart.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  mouserCart = inject(MouserCartService);
  username: string = '';
  fullName: string = '';
  password: string = '';
  email: string = '';
  lastOrder: any;
  date = new Date();
  cartInfo: any;
  ngOnInit(): void {
    this.username = this.auth.username;
    this.fullName = this.auth.fullname;
    this.password = this.auth.password;
    this.email = this.auth.email;
    this.lastOrder = this.auth.getLastOrder();
    this.mouserCart.getCart().subscribe(data => {
      this.cartInfo = data.CartItems;
      console.log(this.cartInfo);
    })
  }
}
