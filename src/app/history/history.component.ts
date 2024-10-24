import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgClass],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  isOpen: boolean = false;
  isDark: boolean = false;
  constructor() {
    this.isDark = document.documentElement.classList.contains('dark');
  }
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
  darkTheme() {
    this.isDark = !this.isDark;
    if(this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
