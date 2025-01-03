import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CollapseListComponent } from "../collapse-list/collapse-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CollapseListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  ngOnInit(): void {
  }
}
