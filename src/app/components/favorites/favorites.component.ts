import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favoritesService = inject(FavoritesService);
  favorites: Product[] = [];

  ngOnInit(): void {
    this.favoritesService.favorites$.subscribe((data) => {
      this.favorites = data;
    });
  }

  removeFromFavorites(mouserPart: string): void {
    this.favoritesService.removeFromFavorites(mouserPart);
  }
}
