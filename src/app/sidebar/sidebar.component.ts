import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TreolanService } from '../services/treolan.service';
// import { FiltersComponent } from "../filters/filters.component";
import { HistoryComponent } from "../history/history.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [HistoryComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  treolan = inject(TreolanService);
  ngOnInit(): void {
  }
}
