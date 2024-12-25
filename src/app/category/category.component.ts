import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';

import { TreolanService } from '../services/treolan.service';
import { ConvertJsonService } from '../services/convert-json.service';

import { Category } from '../interfaces/Category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProgressSpinnerModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  treolan = inject(TreolanService);
  convert = inject(ConvertJsonService);
  login: string = 'antex_api';
  password: string = 't!bRt!0;';
  xmlResponse: string = '';
  @Input() categories: Category[] = [];

  ngOnInit(): void {
    this.treolan.postCaregories(this.login, this.password).subscribe((xml) => {
      this.xmlResponse = xml;
      this.convert.convertXmlToJson(this.xmlResponse).then((json) => {
        this.categories = this.extractCategories(json);
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
  toggleChildren(category: Category): void {
    category.isExpanded = !category.isExpanded;
  }

  // Метод для извлечения категорий из JSON и создания древовидной структуры
  extractCategories(json: any): Category[] {
    const catalogXmlString =
      json['soap:Envelope']['soap:Body']['q1:GetCategoriesResponse']['Result'][
        '_'
      ];

    const parser = new DOMParser();
    const catalogXml = parser.parseFromString(catalogXmlString, 'text/xml');
    const categoryNodes = catalogXml.getElementsByTagName('category');

    let categories: Category[] = [];
    let categoryMap: { [key: string]: Category } = {}; // Для быстрого поиска категорий по id

    // Преобразуем XML в массив объектов Category
    Array.from(categoryNodes).forEach((node: any) => {
      const category: Category = {
        id: node.getAttribute('id'),
        name: node.getAttribute('name') || '',
        parentId: node.getAttribute('parentid'),
        sortIndex: +node.getAttribute('sortindex') || 0,
        children: [],
      };
      categories.push(category);
      categoryMap[category.id] = category; // Добавляем в map для быстрого поиска
    });

    // Строим древовидную структуру по parentId
    let rootCategories: Category[] = [];
    categories.forEach((category) => {
      if (category.parentId === '04030ab1-678b-457d-8976-ac7297c65ce6') {
        // Это корневая категория
        rootCategories.push(category);
      } else {
        const parentCategory = categoryMap[category.parentId];
        if (parentCategory) {
          parentCategory.children?.push(category);
        }
      }
    });

    return rootCategories;
  }
}
