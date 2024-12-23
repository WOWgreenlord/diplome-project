import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';

import { TreolanService } from '../services/treolan.service';
import { Token } from '../interfaces/Token';
import { Category } from '../interfaces/Category';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProgressSpinnerModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  treolan = inject(TreolanService);
  token: Token | null = null;
  categories: Category[] = [];

  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      // console.log(token);
      this.token = token;
      // console.log(this.token);
      this.treolan.getCategories(token!.access_token).subscribe((response) => {
        if (token) {
          this.loadCategories(token.access_token); // Загружаем категории
        }
      });
    });
  }

  private loadCategories(token: string): void {
    this.treolan.getCategories(token).subscribe({
      next: (categories) => {
        this.categories = categories; // Сохраняем категории в массив
        console.log('Категории:', this.categories);
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
}

