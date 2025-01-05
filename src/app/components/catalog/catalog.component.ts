import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MouserService } from '../../services/mouser.service';
import { FavoritesService } from '../../services/favorites.service';

import { Product } from '../../interfaces/Product';

import { DeclinePipe } from '../../pipes/decline.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [DeclinePipe, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  mouser = inject(MouserService);
  favorites = inject(FavoritesService);
  productList?: Product[];
  catalogProductList?: Product[];
  ngOnInit(): void {
    this.mouser.productData$.subscribe((data) => {
      this.productList = data;
      console.log(data);
    });
    this.mouser.postProductsCatalog().subscribe((data) => {
      this.catalogProductList = data.SearchResults.Parts;
      console.log(this.catalogProductList);
    });
  }
  addToFavorites(product: Product) {
    this.favorites.addToFavorites(product);
    console.log(`Продукт добавлен в избранное:`, product);
  }
}
