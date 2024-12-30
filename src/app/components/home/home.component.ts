import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { TreolanService } from '../../services/treolan.service';
import { ConvertJsonService } from '../../services/convert-json.service';
import { Product, Property, PropertyGroup } from '../../interfaces/Product';
import { Category } from '../../interfaces/Category';
import { CollapseListComponent } from '../collapse-list/collapse-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, CollapseListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  treolan = inject(TreolanService);
  convert = inject(ConvertJsonService);
  Login: string = 'antex_api';
  login: string = 'antex_api';
  password: string = 't!bRt!0;';
  Articul: string = '470065-184';
  category: string = '209b8fb1-84c4-48c5-b1d4-8bdba4a436fa';
  products: any;
  selectedCategories: Category[] = [];
  ngOnInit() {
    // Подписываемся на изменения выбранных категорий
    this.treolan.selectedCategories$.subscribe((categories) => {
      this.selectedCategories = categories;
      const selectedIds = categories.map((category) => category.id);
      this.fetchProductsByCategories(selectedIds);
    });
  }

  getProductInfo() {
    this.treolan
      .postProductInfo(this.Login, this.password, this.Articul)
      .subscribe(
        (xml) => {
          // console.log('Product Info:', xml);
          this.products = this.convert.convertXmlToJson(xml); // Преобразуйте XML в JSON, если необходимо
          // this.extractProductInfo(this.products);
        },
        (error) => {
          console.error('Error fetching product info:', error);
        }
      );
  }
  extractProductInfo(json: any): Product {
    // Извлекаем строку из тега Result
    const resultXmlString =
      json['soap:Envelope']['soap:Body']['q1:ProductInfoV2Response']['Result'][
        '_'
      ];

    // Декодируем XML-специальные символы
    const parser = new DOMParser();
    const resultXml = parser.parseFromString(resultXmlString, 'text/xml');

    // Извлекаем общую информацию о продукте
    const productNode = resultXml.querySelector('Product');
    if (!productNode) {
      throw new Error('Product node not found in the response.');
    }

    const product: Product = {
      articul: productNode.getAttribute('Articul') || '',
      shortDesc: productNode.getAttribute('ShortDesc') || '',
      rusDesc: productNode.getAttribute('RusDescr') || '',
      weightBrutto: parseFloat(productNode.getAttribute('WeightBrutto') || '0'),
      dimensions: {
        length: parseInt(productNode.getAttribute('Length') || '0'),
        height: parseInt(productNode.getAttribute('Height') || '0'),
        width: parseInt(productNode.getAttribute('Width') || '0'),
      },
      propertyGroups: [],
      vendorWebAddresses: [],
      pictureLinks: [],
    };

    // Извлекаем группы свойств
    const propertyGroupNodes = resultXml.querySelectorAll('PropertyGroup');
    propertyGroupNodes.forEach((groupNode) => {
      const group: PropertyGroup = {
        id: groupNode.getAttribute('ID') || '',
        name: groupNode.getAttribute('Name') || '',
        level: parseInt(groupNode.getAttribute('Level') || '0'),
        sort: parseInt(groupNode.getAttribute('Sort') || '0'),
        properties: [],
      };

      // Извлекаем свойства из группы
      const propertyNodes = groupNode.querySelectorAll('Property');
      propertyNodes.forEach((propertyNode) => {
        const property: Property = {
          id: propertyNode.getAttribute('ID') || '',
          name: propertyNode.getAttribute('Name') || '',
          value: propertyNode.getAttribute('Value') || '',
          description: propertyNode.getAttribute('Description') || '',
          valueType: propertyNode.getAttribute('ValueType') || '',
          level: parseInt(propertyNode.getAttribute('Level') || '0'),
          sort: parseInt(propertyNode.getAttribute('Sort') || '0'),
        };
        group.properties.push(property);
      });

      product.propertyGroups.push(group);
    });

    // Извлекаем веб-адреса
    const vendorWebAddressNodes = resultXml.querySelectorAll(
      'VendorWebAddresses > row'
    );
    vendorWebAddressNodes.forEach((rowNode) => {
      const address = rowNode.getAttribute('WebAddresses');
      if (address) {
        product.vendorWebAddresses.push(address);
      }
    });

    // Извлекаем ссылки на изображения
    const pictureLinkNodes = resultXml.querySelectorAll('PictureLink > row');
    pictureLinkNodes.forEach((rowNode) => {
      const link = rowNode.getAttribute('Link');
      if (link) {
        product.pictureLinks.push({
          link,
          imageSize: rowNode.getAttribute('ImageSize') || '',
          imageType: rowNode.getAttribute('ImageType') || '',
          isOldImage: rowNode.getAttribute('isOldImage') === '1',
          main: rowNode.getAttribute('Main') === '1',
        });
      }
    });

    return product;
  }
  catalog: any;
  getCatalog() {
    this.treolan
      .postGenCatalog(this.login, this.password, this.category)
      .subscribe(
        (data) => {
          this.catalog = data; // Преобразуйте XML в JSON, если нужно
          console.log('Catalog data:', data);
        },
        (error) => {
          console.error('Error fetching catalog:', error);
        }
      );
  }
  // Обработчик для получения выбранных категорий
  handleCategoriesSelected(selectedCategories: Category[]) {
    const selectedIds = selectedCategories.map((category) => category.id);
    this.fetchProductsByCategories(selectedIds);
  }

  // Запрос продуктов по выбранным категориям
  fetchProductsByCategories(categoryIds: string[]) {
    const idsAsString = categoryIds.join(','); // Преобразование массива в строку
    this.treolan.postGenCatalog('antex_api', 't!bRt!0;', idsAsString).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}

