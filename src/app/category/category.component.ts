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
  // laptopsID: string = '29446';
  // parenId: string = '27512';
  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;

    // if (this.categoryId) {
    //   this.loadProducts();
    // }
  }
  // private loadProducts(): void {
  //   this.treolan.getProductsByCategory(this.laptopsID, this.parenId, this.categoryName!).subscribe({
  //     next: (products) => {
  //       this.products = products; // Сохраняем полученные товары
  //       console.log('Товары категории:', this.products);
  //     },
  //     error: (err) => {
  //       console.error('Ошибка при загрузке товаров:', err);
  //     },
  //   });
  // }
  }
