import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { Category } from '../../interfaces/Category';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-collapse-list',
  standalone: true,
  imports: [NgClass, CategoryComponent],
  templateUrl: './collapse-list.component.html',
  styleUrl: './collapse-list.component.css',
})
export class CollapseListComponent {
  // Переменная для отслеживания состояния раскрытия списка
  isExpanded: boolean = false;
  isExpandedSub: boolean = false;
  @Input() childTitle: string = '';
  @Input() listItems: string[] = [];
  @Input() catalCategories: Category[] = [];

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
}
