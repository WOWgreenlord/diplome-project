import { Routes } from '@angular/router';


import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ManufacturersComponent } from './components/manufacturers/manufacturers.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Перенаправление на /home
  { path: 'home', component: HomeComponent },
  { path: 'manufacturers', component: ManufacturersComponent },
  { path: '**', component: PageNotFoundComponent },
];
