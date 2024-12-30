import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';

import { Category } from '../../interfaces/Category';
import { CategoryComponent } from '../category/category.component';
import { TreolanService } from '../../services/treolan.service';
// import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-collapse-list',
  standalone: true,
  imports: [NgClass, CategoryComponent],
  templateUrl: './collapse-list.component.html',
  styleUrl: './collapse-list.component.css',
})
export class CollapseListComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.catalCategories);
  }
  treolan = inject(TreolanService);
  login: string = 'antex_api';
  password: string = 't!bRt!0;';
  // Переменная для отслеживания состояния раскрытия списка
  isExpanded: boolean = false;
  isExpandedSub: boolean = false;
  @Input() childTitle: string = '';
  @Input() listItems: string[] = [];
  @Input() catalCategories: Category[] = [];
  @Output() categoriesSelected = new EventEmitter<Category[]>();
  // @Output() productsFetched = new EventEmitter<any>();
  // Переключение состояния раскрытия
  toggleList() {
    this.isExpanded = !this.isExpanded;
  }
  toggleSubList() {
    this.isExpandedSub = !this.isExpandedSub;
  }
  // Метод для переключения раскрытия дочерних категорий
  toggleCategory(category: Category) {
    category.isExpanded = !category.isExpanded;
  }

  // Обработчик изменения состояния чекбокса
  onCategorySelectionChange(category: Category) {
    category.isSelected = !category.isSelected;
  }

  // Отправка выбранных категорий
  submitSelectedCategories() {
    const selectedCategories = this.getSelectedCategories(this.catalCategories);
    this.treolan.updateSelectedCategories(selectedCategories); // Обновление через сервис
  }

  private getSelectedCategories(categories: Category[]): Category[] {
    let selected: Category[] = [];
    categories.forEach((category) => {
      if (category.isSelected) {
        selected.push(category);
      }
      if (category.children && category.children.length > 0) {
        selected = selected.concat(
          this.getSelectedCategories(category.children)
        );
      }
    });
    return selected;
  }

  // Метод для обработки изменения состояния checkbox
  // onCategorySelectionChange(category: Category) {
  //   category.isSelected = !category.isSelected;

  //   if (category.isSelected) {
  //     // Отправляем запрос для получения товаров, если категория выбрана
  //     this.fetchProductsForCategory(category);
  //   }
  // }

  // Метод для отправки запроса на сервер для получения товаров по категории
  // fetchProductsForCategory(category: Category) {
  //   const categoryId = category.id;

  //   // Отправляем запрос на сервер
  //   this.treolan
  //     .postGenCatalog(this.login, this.password, categoryId, '')
  //     .subscribe(
  //       (products) => {
  //         // После получения данных о товарах, передаем их родительскому компоненту
  //         this.productsFetched.emit(products);
  //       },
  //       (error) => {
  //         console.error('Error fetching products:', error);
  //       }
  //     );
  // }
}
