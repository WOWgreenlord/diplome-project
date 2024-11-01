import { Routes } from '@angular/router';


import { RegisterComponent } from './register/register.component';
import { ModalComponent } from './modal/modal.component';



export const routes: Routes = [
  {path: 'login', component: ModalComponent},
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
