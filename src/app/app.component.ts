import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TreolanService } from './services/treolan.service';
import { Token } from './interfaces/Token';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CatalogComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'diplome-project-2.0';
  treolan = inject(TreolanService);


  ngOnInit(): void {
    this.treolan
      .postToken('t!bRt!0;', '559f956e4aaf', 'antex_api', 'ru.treolan.apps.35')
      .subscribe((token: Token) => {
        console.log('Token:', token.access_token);
      });
  }
}
