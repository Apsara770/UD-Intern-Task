import { Routes } from '@angular/router';
import { ListItemsComponent } from './pages/items/list-items/list-items';
import { AddItemComponent } from './pages/items/add-item/add-item';
import { EditItemComponent } from './pages/items/edit-item/edit-item';
import { ListInvoicesComponent } from './pages/invoices/list-invoices/list-invoices';
import { AddInvoiceComponent } from './pages/invoices/add-invoice/add-invoice';
import { ViewInvoiceComponent } from './pages/invoices/view-invoice/view-invoice';

export const routes: Routes = [
  // Items routes
  { path: 'items', component: ListItemsComponent },
  { path: 'items/add', component: AddItemComponent },
  { path: 'items/edit/:id', component: EditItemComponent },

  // Invoices routes
  { path: 'invoices', component: ListInvoicesComponent },
  { path: 'invoices/add', component: AddInvoiceComponent },
  { path: 'invoices/view/:id', component: ViewInvoiceComponent },

  // Default route
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: '**', redirectTo: 'items' } // fallback route
];
