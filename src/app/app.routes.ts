import { Routes } from '@angular/router';


// import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ManufacturersComponent } from './components/manufacturers/manufacturers.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Перенаправление на /home
  { path: 'home', component: HomeComponent },
  { path: 'manufacturers', component: ManufacturersComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'product/:MouserPartNumber', component: ProductComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'cart', component: CartComponent},
  { path: '**', component: PageNotFoundComponent },
];
