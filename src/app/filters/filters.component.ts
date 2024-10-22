import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgClass],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  isOpen: boolean = false;
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
}
