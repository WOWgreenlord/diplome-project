import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MouserCartService } from '../../services/mouser-cart.service';
import { Product } from '../../interfaces/Product';
import { Cart } from '../../interfaces/Cart';
import { DeclinePipe } from '../../pipes/decline.pipe';
import { MouserService } from '../../services/mouser.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DeclinePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  mouserCart = inject(MouserCartService);
  router = inject(Router);
  cartData?: any;
  errorMessage: string = '';
  cartItems: any;
  headers: string[] = [
    'Позиция',
    'О товаре',
    'Описание',
    'Количество',
    'Цена за единицу (USD)',
    'Цена сумарно (USD)',
    'Корзина',
  ];
  ngOnInit(): void {
    this.mouserCart.getCart().subscribe((cart) => {
      this.cartData = cart;
      console.log(this.cartData);
      this.cartItems = this.cartData?.CartItems;
      console.log(this.cartItems);
      // console.log(this.cartItems);
    });
  }
  // Метод для удаления товара
  removeItem(mouserPartNumber: string): void {
    this.mouserCart.removeItemFromCart(mouserPartNumber).subscribe({
      next: (response) => {
        console.log('Товар успешно удален:', response);
        this.refreshCart(); // Обновляем корзину
        console.log(this.cartData);
      },
      error: (error) => {
        console.error('Ошибка при удалении товара:', error);
      },
    });
  }

  // Метод для обновления корзины после удаления
  refreshCart(): void {
    // Реализуйте метод получения корзины, если он еще не настроен
    this.mouserCart.getCart().subscribe((data) => {
      this.cartData = data;
    });
  }
  navigateToOrder(): void {
    this.router.navigate(['/order']); // Навигация на компонент оформления заказа
  }
}

