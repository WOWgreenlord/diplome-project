import { Component, inject, OnInit } from '@angular/core';
import { MouserService } from '../../services/mouser.service';
import { Manufacturer } from '../../interfaces/Manufacturer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manufacturers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.css',
})
export class ManufacturersComponent implements OnInit {
  mouser = inject(MouserService);
  manufacturers: Manufacturer[] = [];
  ngOnInit(): void {
    this.mouser.getManufacturers().subscribe((manufacturers) => {
      this.manufacturers = manufacturers.MouserManufacturerList;
      console.log(this.manufacturers);
    });
  }
}
