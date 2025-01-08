import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';

import { MouserService } from '../../services/mouser.service';
import { PriceBreak, Product } from '../../interfaces/Product';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, AccordionModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  mouser = inject(MouserService);
  router = inject(ActivatedRoute);
  favorite = inject(FavoritesService);
  mouserPartNumber: string = '';
  product?: Product;
  quantity: number = 1;
  unitPrice: string = ''; // Цена за единицу (с валютой)
  summaryPrice: string = ''; // Итоговая цена (с валютой)
  price: number[] = [];
  compliance: any;
  isFullDescriptionVisible: boolean = false; // Флаг для управления состоянием описания

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.mouserPartNumber = params.get('MouserPartNumber') || '';
      this.loadProductDetails()
    });
    this.mouser.productData$.subscribe((data) => {
      if (data) {
        this.product = data.find(
          (item: Product) => item.MouserPartNumber === this.mouserPartNumber
        );
      }

      // Если данные не найдены, можно отправить запрос к серверу
      if (!this.product) {
        this.loadProductDetails();
      } else {
        this.compliance = this.product.ProductCompliance
      }
    });
  }
  // Метод для загрузки деталей товара с сервера (по необходимости)
  loadProductDetails(): void {
    this.mouser.postProducts(this.mouserPartNumber).subscribe((response) => {
      if (
        response &&
        response.SearchResults &&
        response.SearchResults.Parts.length > 0
      ) {
        this.product = response.SearchResults.Parts[0]; // Пример: настройте в зависимости от структуры данных
        this.quantity = response.SearchResults.Parts[0].PriceBreaks;
        this.compliance = this.product?.ProductCompliance;
        this.updatePrice();
      }
    });
  }
  addToFavorites(product: Product) {
    this.favorite.addToFavorites(product);
  }
  // Метод для расчёта цены
  updatePrice(): void {
    if (this.product && this.product.PriceBreaks) {
      const priceBreak = this.product.PriceBreaks.slice() // Создаем копию массива
        .reverse() // Переворачиваем массив для сортировки по убыванию
        .find((breakPoint: PriceBreak) => this.quantity >= breakPoint.Quantity);

      if (priceBreak) {
        this.unitPrice = priceBreak.Price; // Берем цену из PriceBreak
        this.summaryPrice = `$${(
          parseFloat(priceBreak.Price.replace('$', '')) * this.quantity
        ).toFixed(2)}`; // Рассчитываем итоговую стоимость
      } else {
        this.unitPrice = 'N/A'; // Если цена не найдена
        this.summaryPrice = 'N/A';
      }
    }
  }
  logSheet() {
    console.log(this.product?.DataSheetUrl);
  }
  getDescription(description: string): string {
    if (!description) return ''; // На случай, если description отсутствует
    return this.isFullDescriptionVisible
      ? description
      : description.slice(0, 110) + (description.length > 110 ? '...' : '');
  }
  toggleDescriptionVisibility(): void {
    this.isFullDescriptionVisible = !this.isFullDescriptionVisible;
  }
}
