import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { Category } from '../../interfaces/Category';

@Component({
  selector: 'app-collapse-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './collapse-list.component.html',
  styleUrl: './collapse-list.component.css',
})
export class CollapseListComponent {
  // Переменная для отслеживания состояния раскрытия списка
  isExpanded: boolean = false;
  @Input() childTitle: string = '';
  @Input() listItems: string[] = [];
  @Input() catalCategories: Category[] = [];

  // Переключение состояния раскрытия
  toggleList() {
    this.isExpanded = !this.isExpanded;
  }
  toggleChildren(category: Category): void {
    category.isExpanded = !category.isExpanded;
  }
}
