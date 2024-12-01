import { Component, inject, OnInit } from '@angular/core';

import { TreolanService } from '../services/treolan.service';
import { Token } from '../interfaces/Token';
import { Category } from '../interfaces/Category';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  treolan = inject(TreolanService);
  token: Token | null = null;
  imgLink: string = '';
  catArr: Category[] = [];
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      this.treolan.getCategories(token.access_token).subscribe((response) => {
        console.log(response);
        if (token) {
          this.loadCategories(token.access_token); // Загружаем категории
        }
      });
    });
  }
  private loadCategories(token: string): void {
    this.treolan.getCategories(token).subscribe({
      next: (categories) => {
        this.catArr = categories; // Сохраняем категории в массив
        console.log('Категории:', this.catArr);
      },
      error: (err) => {
        console.error('Ошибка при загрузке категорий:', err);
      },
    });
  }

  selectCategory(categoryId: number): void {
    if (this.token) {
      this.treolan.getProducts(this.token.access_token, categoryId).subscribe({
        next: (products) => {
          console.log('Товары для категории:', categoryId, products);
          // Здесь можно обновить локальное состояние или передать данные в другой компонент
        },
        error: (err) => {
          console.error('Ошибка при загрузке товаров:', err);
        },
      });
    } else {
      console.error('Токен отсутствует!');
    }
  }
  // loadProducts(token: string): void {
  //   this.treolan.getProducts(token).subscribe({
  //     next: (products) => {
  //       console.log('Продукты:', products);
  //     },
  //     error: (err) => {
  //       console.error('Ошибка при загрузке продуктов:', err);
  //     }
  //     })
  // }
}
