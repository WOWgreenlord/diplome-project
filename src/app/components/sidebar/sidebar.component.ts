import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


import { TreolanService } from '../../services/treolan.service';
import { ConvertJsonService } from '../../services/convert-json.service';

import { Category } from '../../interfaces/Category';

import { CollapseListComponent } from "../collapse-list/collapse-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CollapseListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  treolan = inject(TreolanService);
  convert = inject(ConvertJsonService);
  login: string = 'antex_api';
  password: string = 't!bRt!0;';
  xmlResponse: string = '';
  categoriesExpanded: boolean = false;
  vendorsExpanded: boolean = false;
  // Данные для категорий и вендоров
  @Input() categories: Category[] = [];
  vendors = ['Вендор 1', 'Вендор 2', 'Вендор 3'];

  // Заголовки для collapse-списков
  categoriesTitle: string = 'Категории';
  vendorsTitle: string = 'Вендоры';

  ngOnInit(): void {
    this.treolan.postCaregories(this.login, this.password).subscribe((xml) => {
      this.xmlResponse = xml;
      this.convert.convertXmlToJson(this.xmlResponse).then((json) => {
        this.categories = this.convert.extractCategories(json);
        this.initializeExpandedState(this.categories);
        console.log(this.categories); // Лог для проверки
      });
    });
  }

  initializeExpandedState(categories: Category[]): void {
    categories.forEach((category) => {
      category.isExpanded = false; // По умолчанию все категории свернуты
      if (category.children && category.children.length > 0) {
        this.initializeExpandedState(category.children); // Рекурсивно для дочерних категорий
      }
    });
  }

  // Метод для переключения состояния раскрытия категории
  
  // Метод для переключения отображения категорий
  toggleCategories() {
    this.categoriesExpanded = !this.categoriesExpanded;
  }

  // Метод для переключения отображения вендоров
  toggleVendors() {
    this.vendorsExpanded = !this.vendorsExpanded;
  }
}
