import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TreolanService } from './services/treolan.service';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { CategoryComponent } from './category/category.component';
// import { CatalogComponent } from "./catalog/catalog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'diplome-project-2.0';
  treolan = inject(TreolanService);
  login: string = 'antex_api';
  password: string = 't!bRt!0;';


  ngOnInit(): void {
    
  }
  
}
