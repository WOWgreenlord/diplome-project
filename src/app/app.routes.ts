import { Routes } from '@angular/router';


import { RegisterComponent } from './register/register.component';
import { ModalComponent } from './modal/modal.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CategoryComponent } from './category/category.component';



export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent},
  { path: 'catalog/:categoryName/:categoryId', component: CategoryComponent},
  { path: 'vendors', component: VendorsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
