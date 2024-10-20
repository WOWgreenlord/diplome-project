import { Component, inject, OnInit } from '@angular/core';

import { Token } from '../interfaces/Token';
import { TreolanService } from '../services/treolan.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  treolan = inject(TreolanService)
  token: Token | null = null;
  
  ngOnInit(): void {
    this.treolan.token$.subscribe((token) => {
      this.token = token;
      // console.log('Token from header component:', token.access_token)
    })
  }

}
