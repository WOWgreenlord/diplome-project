import { Routes } from '@angular/router';


import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './components/home/home.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { CategoryComponent } from './components/category/category.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'catalog', component: CatalogComponent},
  // { path: 'catalog/:categoryName/:categoryId', component: CategoryComponent},
  { path: 'category', component: CategoryComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
