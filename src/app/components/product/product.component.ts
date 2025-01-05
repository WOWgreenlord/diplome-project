import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MouserService } from '../../services/mouser.service';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  mouser = inject(MouserService);
  router = inject(ActivatedRoute);
  mouserPartNumber: string = '';
  product?: Product;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.mouserPartNumber = params.get('MouserPartNumber') || '';
    })
    this.mouser.productData$.subscribe((data) => {
      console.log(data);
      this.product = data;
    })
  }
}
