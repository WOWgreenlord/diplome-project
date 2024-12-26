import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';

import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class ConvertJsonService {

  constructor() { }

  convertXmlToJson(xml: string): Promise<any> {
      return new Promise((resolve, reject) => {
        parseString(xml, { explicitArray: false }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

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
