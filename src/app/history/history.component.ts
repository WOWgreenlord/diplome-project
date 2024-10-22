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
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
}
