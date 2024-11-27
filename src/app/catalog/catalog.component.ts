import { Component, inject, OnInit } from '@angular/core';

import { TreolanService } from '../services/treolan.service';
import { Token } from '../interfaces/Token';
import { Category } from '../interfaces/Category';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  treolan = inject(TreolanService);
  token: Token | null = null;
  imgLink: string = '';
  catArr: Category[] = [];
  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      this.treolan.getCategories(token.access_token).subscribe((response) => {
        console.log(response);
        if (token) {
          this.loadCategories(token.access_token); // Загружаем категории
        }
      })
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
}
