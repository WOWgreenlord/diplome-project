import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MouserService } from '../../services/mouser.service';
import { FavoritesService } from '../../services/favorites.service';

import { Product } from '../../interfaces/Product';

import { DeclinePipe } from '../../pipes/decline.pipe';
import { MouserCartService } from '../../services/mouser-cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [DeclinePipe, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  mouser = inject(MouserService);
  mouserCart = inject(MouserCartService);
  favorites = inject(FavoritesService);
  productList?: Product[];
  catalogProductList?: Product[];
  currentPage: number = 1; // текущая страница
  itemsPerPage: number = 10; // количество элементов на одной странице
  totalItems: number = 0; // общее количество продуктов

  get paginatedCatalogList(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.catalogProductList?.slice(startIndex, endIndex) || [];
  }
  get totalPages(): number {
    return Math.ceil(
      (this.catalogProductList?.length || 0) / this.itemsPerPage
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  ngOnInit(): void {
    this.mouser.productData$.subscribe((data) => {
      this.productList = data;
      
    });
    this.mouser.postProductsCatalog().subscribe((data) => {
      this.catalogProductList = data.SearchResults.Parts;
      this.totalItems = +this.catalogProductList!.length;
    });
  }
  addToFavorites(product: Product) {
    this.favorites.addToFavorites(product);
    console.log(`Продукт добавлен в избранное:`, product);
  }
}
