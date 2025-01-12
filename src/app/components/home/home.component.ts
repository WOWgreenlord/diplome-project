import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { Product } from '../../interfaces/Product';
import { CollapseListComponent } from '../collapse-list/collapse-list.component';
import { MouserService } from '../../services/mouser.service';
import { Logo } from '../../interfaces/Logo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  mouser = inject(MouserService);
  productData?: Product[];

  ngOnInit() {
    this.mouser.productData$.subscribe((data) => {
      this.productData = data;
    });
  }
  logos: Logo[] = [
      { Link: 'logos/Amphenol-Logo.png', Site: '' },
      { Link: 'logos/Arduino-Logo.png', Site: '' },
      { Link: 'logos/Bosch-Logo.png', Site: '' },
      { Link: 'logos/Mean-Well-Logo.png', Site: '' },
      { Link: 'logos/Mitsubishi-Electric-Logo.png', Site: '' },
      { Link: 'logos/Molex-Logo.png', Site: '' },
      { Link: 'logos/Omron-Logo.png', Site: '' },
      // { Link: 'logos/Siemens-Logo.png', Site: '' },
      // { Link: 'logos/TE-Connectivity-Logo.png', Site: '' },
    ];
}

