import { Component, inject, OnInit } from '@angular/core';
import { TreolanService } from '../services/treolan.service';
import { Token } from '../interfaces/Token';
import { FiltersComponent } from "../filters/filters.component";
import { HistoryComponent } from "../history/history.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FiltersComponent, HistoryComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  treolan = inject(TreolanService);
  token: Token | null = null;
  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      // console.log('Token from sidebar component:', token.access_token)
    })
  }
}
