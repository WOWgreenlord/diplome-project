import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MouserService } from '../../services/mouser.service';
import { Product } from '../../interfaces/Product';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  mouser = inject(MouserService);
  router = inject(ActivatedRoute);
  favorite = inject(FavoritesService);
  mouserPartNumber: string = '';
  product?: Product;
  price: number[] = [];

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.mouserPartNumber = params.get('MouserPartNumber') || '';
    })
    this.mouser.productData$.subscribe((data) => {
      if (data) {
        this.product = data.find((item: Product) => item.MouserPartNumber === this.mouserPartNumber);
      }

      // Если данные не найдены, можно отправить запрос к серверу
      if (!this.product) {
        this.loadProductDetails();
      }
    });
  }
  // Метод для загрузки деталей товара с сервера (по необходимости)
  loadProductDetails(): void {
    this.mouser.postProducts(this.mouserPartNumber).subscribe((response) => {
      this.product = response.SearchResults.Parts[0]; // Пример: настройте в зависимости от структуры данных
      console.log(this.price);
    });
  }
  addToFavorites(product: Product) {
    this.favorite.addToFavorites(product);
  }
}
