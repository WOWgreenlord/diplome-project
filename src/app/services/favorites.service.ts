import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: Product[] = [];
  private favoritesSubject = new BehaviorSubject<Product[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  addToFavorites(product: Product): void {
    if (
      !this.favorites.find(
        (p) => p.MouserPartNumber === product.MouserPartNumber
      )
    ) {
      this.favorites.push(product);
      this.favoritesSubject.next(this.favorites);
    }
  }

  removeFromFavorites(mouserPart: string): void {
    this.favorites = this.favorites.filter(
      (p) => p.MouserPartNumber !== mouserPart
    );
    this.favoritesSubject.next(this.favorites);
  }
}
