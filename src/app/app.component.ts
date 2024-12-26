import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TreolanService } from './services/treolan.service';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { CategoryComponent } from './components/category/category.component';
import { VendorsComponent } from "./components/vendors/vendors.component";
import { CollapseListComponent } from "./components/collapse-list/collapse-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CategoryComponent, VendorsComponent, CollapseListComponent],
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
