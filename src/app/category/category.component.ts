import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreolanService } from '../services/treolan.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
categoryName: string | null = null
treolan = inject(TreolanService)
route = inject(ActivatedRoute)
ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
}
}


