import { Component, inject, OnInit } from '@angular/core';

import { TreolanService } from '../services/treolan.service';


@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css',
})
export class VendorsComponent implements OnInit {
  treolan = inject(TreolanService);
  vendors: any = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  ngOnInit(): void {
    
  }
}
