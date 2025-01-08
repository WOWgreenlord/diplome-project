import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Button, ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';



import { Product } from '../../interfaces/Product';
import { CollapseListComponent } from '../collapse-list/collapse-list.component';
import { MouserService } from '../../services/mouser.service';
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
  productData?: Product[];
  responsiveOptions: any[] | undefined;
  logos: Logo[] = [
    { Link: 'logos/Molex-Logo.png', Site: 'https://www.molex.com/' },
    { Link: 'logos/Mean-Well-Logo.png', Site: 'https://www.meanwell.com/' },
    { Link: 'logos/TE-Connectivity-Logo.png', Site: 'https://www.te.com/' },
    { Link: 'logos/Arduino-Logo.png', Site: 'https://www.arduino.cc/' },
    { Link: 'logos/Amphenol-Logo.png', Site: 'https://www.amphenol.com/' },
    { Link: 'logos/Bosch-Logo.png', Site: 'https://www.bosch.com/' },
    { Link: 'logos/Siemens-Logo.png', Site: 'https://www.siemens.com/' },
    {
      Link: 'logos/Mitsubishi-Electric-Logo.png',
      Site: 'https://www.mitsubishielectric.com/',
    },
    {
      Link: 'logos/Omron-Logo.png',
      Site: 'https://www.omron.com/global/en/',
    },
  ];
  ngOnInit() {
    this.mouser.productData$.subscribe((data) => {
      this.productData = data;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 3,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}

