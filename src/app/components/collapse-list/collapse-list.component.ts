import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-collapse-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './collapse-list.component.html',
  styleUrl: './collapse-list.component.css',
})
export class CollapseListComponent implements OnInit {
  ngOnInit(): void {
  }
  isExpanded: boolean = false;
  isExpandedSub: boolean = false;
}
