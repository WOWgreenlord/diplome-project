import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Button, ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';



import { Product } from '../../interfaces/Product';
import { CollapseListComponent } from '../collapse-list/collapse-list.component';
import { MouserService } from '../../services/mouser.service';
import { ToshibaService } from '../../services/toshiba.service';
import { Logo } from '../../interfaces/Logo';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, CollapseListComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  mouser = inject(MouserService);
  toshiba = inject(ToshibaService);
  productData?: Product[];
  responsiveOptions: any[] | undefined;
  logos: Logo[] = [
    { Link: 'logos/Molex-Logo.png' },
    { Link: 'logos/Mean-Well-Logo.png' },
    { Link: 'logos/TE-Connectivity-Logo.png' },
    { Link: 'logos/Arduino-Logo.png' },
    { Link: 'logos/Amphenol-Logo.png' },
    { Link: 'logos/Bosch-Logo.png' },
  ];
  ngOnInit() {
    this.mouser.productData$.subscribe((data) => {
      this.productData = data;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}

