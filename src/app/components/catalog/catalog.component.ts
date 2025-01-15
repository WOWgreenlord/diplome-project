import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MouserService } from '../../services/mouser.service';
import { FavoritesService } from '../../services/favorites.service';

import { Product } from '../../interfaces/Product';

import { DeclinePipe } from '../../pipes/decline.pipe';
import { MouserCartService } from '../../services/mouser-cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [DeclinePipe, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  mouser = inject(MouserService);
  mouserCart = inject(MouserCartService);
  favorites = inject(FavoritesService);
  productList?: Product[];
  catalogProductList?: Product[];

  ngOnInit(): void {
    this.mouser.productData$.subscribe((data) => {
      this.productList = data;
    });
    this.mouser.postProductsCatalog().subscribe((data) => {
      this.catalogProductList = data.SearchResults.Parts;
    });
  }
  addToFavorites(product: Product) {
    this.favorites.addToFavorites(product);
    console.log(`Продукт добавлен в избранное:`, product);
  }
  onBuyClick(product: Product): void {
    const quantity = 1; // Здесь можно изменить количество товара, если требуется
    this.mouserCart.addToCart(product, quantity).subscribe({
      next: (response) => {
        console.log('Товар добавлен в корзину:', response);
        alert('Товар успешно добавлен в корзину');
      },
      error: (err) => {
        console.error('Ошибка при добавлении товара в корзину:', err);
        alert('Произошла ошибка при добавлении товара в корзину');
      },
    });
  }
}
