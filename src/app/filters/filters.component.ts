import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { TreolanService } from '../services/treolan.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgClass],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  treolan = inject(TreolanService);
  // @Input() token?: Token | null;
  token: Token | null = null;
  isOpen: boolean = false;
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      // this.token = token;
    })
    // this.treolan.getCategories(token$)
  }
}
