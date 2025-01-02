import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CollapseListComponent } from "../collapse-list/collapse-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CollapseListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  ngOnInit(): void {
  }
}
