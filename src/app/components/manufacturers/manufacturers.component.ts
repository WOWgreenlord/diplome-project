import { Component, inject, OnInit } from '@angular/core';
import { MouserService } from '../../services/mouser.service';
import { Manufacturer } from '../../interfaces/Manufacturer';
import { RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-manufacturers',
  standalone: true,
  imports: [RouterLink, ProgressSpinnerModule],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.css',
})
export class ManufacturersComponent implements OnInit {
  mouser = inject(MouserService);
  manufacturers: Manufacturer[] = [];
  isLoading: boolean = true;
  // manufacturersLinks: Link[] = [

  //   {
  //     src: 'https://0x.day/',
  //   },
  //   {
  //     src: 'https://1bitsquared.com/',
  //   },
  //   {
  //     src: 'https://www.1global.com/',
  //   },
  // ];

  // Ссылки, сопоставленные с производителями
  private manufacturerLinks: { [key: string]: string } = {
    '0xDA': 'https://0x.day/',
    '1BitSquared': 'https://1bitsquared.com/',
    '1Global': 'https://www.1global.com/',
    // Добавьте остальные ссылки...
  };
  ngOnInit(): void {
    this.mouser.getManufacturers().subscribe((manufacturers) => {
      this.manufacturers =
        manufacturers.MouserManufacturerList.ManufacturerList.map(
          (manufacturer: Manufacturer) => ({
            ...manufacturer,
            ManufacturerLink:
              this.manufacturerLinks[manufacturer.ManufacturerName] || '', // Присваиваем ссылку
          })
        );
        console.log(this.manufacturers);
        this.isLoading = false;
    });
  }
}

