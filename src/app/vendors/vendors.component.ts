import { Component, inject, OnInit } from '@angular/core';

import { TreolanService } from '../services/treolan.service';

import { Token } from '../interfaces/Token';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css',
})
export class VendorsComponent implements OnInit {
  treolan = inject(TreolanService);
  token: Token | null = null;
  venArr: any = [];

  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      this.treolan.getVendors(token!.access_token).subscribe((response) => {
        if (token) {
          this.loadVendors(token!.access_token); // Загружаем вендоров
        }
      });
    });
  }
  private loadVendors(token: string): any {
    this.treolan.getVendors(token).subscribe({
      next: (vendors) => {
        this.venArr = vendors;
        console.log('Вендоры:', this.venArr);
      },
      error: (err) => {
        console.error('Ошибка при загрузке вендоров:', err);
      },
    });
  }
}
