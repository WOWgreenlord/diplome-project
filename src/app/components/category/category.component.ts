import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {

}
