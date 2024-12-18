import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { TreolanService } from '../services/treolan.service';
import { Product } from '../interfaces/Product';
import { Token } from '../interfaces/Token';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categoryName: string | null = null;
  categoryId: number | null = null;
  treolan = inject(TreolanService);
  route = inject(ActivatedRoute);
  products: any[] = [];
  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    

    if (this.categoryId) {
      this.loadProducts();
    }
  }
  private loadProducts(): void {
    const token = localStorage.getItem('access_token'); // Получаем токен из localStorage или другого места хранения
    console.log(token); // from localStorage

    // Если токен существует и categoryId задан, делаем запрос
    if (token && this.categoryId) {
      this.treolan.getProducts(token, this.categoryId).subscribe({
        next: (response) => {
          this.products = response.products; // Сохраняем товары в массив
          // console.log('Товары для категории:', this.categoryId, products);
      console.log(this.products);

        },
        error: (err) => {
          console.error('Ошибка при загрузке товаров:', err);
        },
      });
    } else {
      console.error('Токен не найден или categoryId не задан!');
    }
  }
}


