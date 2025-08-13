import { Routes } from '@angular/router';
import { AddItemComponent } from './pages/add-item/add-item.component';

export const routes: Routes = [
  { path: 'itemadd', component: AddItemComponent },
  { path: '', redirectTo: 'itemadd', pathMatch: 'full' } // optional default
];
