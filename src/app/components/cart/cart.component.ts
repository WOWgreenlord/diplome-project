import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


import { MouserCartService } from '../../services/mouser-cart.service';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  mouserCart = inject(MouserCartService);
  cartData: any;
  errorMessage: string = '';
  cartItems: Product[] = [];
  ngOnInit(): void {
    this.mouserCart.getCart().subscribe((cart) => {
      console.log(cart);
    });
  }
}
