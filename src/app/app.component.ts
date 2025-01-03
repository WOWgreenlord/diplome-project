import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { CollapseListComponent } from "./components/collapse-list/collapse-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CollapseListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'diplome-project-2.0';

  
  ngOnInit(): void {
    
  }
  
}
