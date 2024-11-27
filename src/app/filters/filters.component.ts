import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TreolanService } from '../services/treolan.service';
import { Token } from '../interfaces/Token';
import { Category } from '../interfaces/Category';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  treolan = inject(TreolanService);
  token: Token | null = null;
  typeahead = new FormControl();
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  categoryNames!: string[];
  suggestions: string[] = [];
  selectedCategory: string = '';
  isOpen: boolean = false;
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    // this.treolan.token$.subscribe((token) => {
    //   this.token = token;
    //   this.treolan
    //     .getCategories(this.token.access_token)
    //     .subscribe((response) => {
    //       //  console.log(response.data) Получение категорий
    //       // this.categories = response.data;
    //       this.categoryNames = this.categories.map((category) => category.Name);
    //       // console.log(this.categoryNames); Получений имен категорий
    //       // console.log('Загруженные категории:', this.categories); Получение имен категорий записанных в свойство
    //     });
    //     // this.treolan.getVendors(this.token.access_token).subscribe((response) => {
    //     //   // console.log('вендоры:', response); получение вендоров
    //     // })
    // });
  }

  suggest() {
    const inputValue = this.typeahead.value?.toLowerCase() || '';
    if (!this.typeahead.value) {
      this.suggestions = []; // Если инпут пустой, очищаем подсказки
      return;
    }
      this.suggestions = this.categoryNames
        .filter((c) => c.toLowerCase().startsWith(inputValue))
        .slice(0, 5);
  }

  selectCategory(category: string): void {
    this.typeahead.setValue(category); // Устанавливаем выбранное значение в input
    this.suggestions = []; // Очищаем список подсказок
  }

  // onInput(event: Event): void {
  //   const input = (event.target as HTMLInputElement).value;
  //   this.filteredCategories = this.categories.filter((category) => category.Name.includes(input));
  // }

  // selectCategory(category: Category): void {
  //   this.selectedCategory = category.Name;
  //   this.filteredCategories = [];
  // }

  // onInputChange(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.inputValue = target.value.trim()

  //   if (!this.inputValue) {
  //     this.filteredCategories = []; // Если инпут пуст, очищаем список
  //     console.log('Инпут пуст, список фильтров очищен');
  //     return;
  //   }

  //   // Фильтрация списка категорий по названию
  //   this.filteredCategories = this.categories.filter((category) => {
  //     category.Name.toLowerCase().includes(this.inputValue.toLowerCase())
  //   });
  //   console.log('Отфильтрованные категории:', this.filteredCategories);
  // };
  // selectCategory(categoryName: string): void {
  //   this.inputValue = categoryName; // Заполнить инпут выбранным
  //   this.filteredCategories = []; // Очистить подсказки
  // }
}
