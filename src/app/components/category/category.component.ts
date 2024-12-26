import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';

import { TreolanService } from '../../services/treolan.service';
import { ConvertJsonService } from '../../services/convert-json.service';

import { Category } from '../../interfaces/Category';

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
        this.categories = this.convert.extractCategories(json);
        this.initializeExpandedState(this.categories);
        console.log(this.categories); // Лог для проверки
      });
    });
  }

  initializeExpandedState(categories: Category[]): void {
    categories.forEach((category) => {
      // category.isExpanded = false; // По умолчанию все категории свернуты
      if (category.children && category.children.length > 0) {
        this.initializeExpandedState(category.children); // Рекурсивно для дочерних категорий
      }
    });
  }

  // Метод для переключения состояния раскрытия категории
  // toggleChildren(category: Category): void {
  //   category.isExpanded = !category.isExpanded;
  // }
}
