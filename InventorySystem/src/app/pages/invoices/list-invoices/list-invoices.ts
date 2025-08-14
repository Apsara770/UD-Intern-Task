import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-list-invoices',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Invoices List</h2>

    <button 
      (click)="addInvoice()" 
      style="
        margin-bottom: 10px; 
        background-color: #4CAF50; 
        color: white; 
        border: none; 
        padding: 8px 14px; 
        border-radius: 4px; 
        cursor: pointer;
      ">
      ➕ Add Invoice
    </button>
    
    <table border="1" cellpadding="5" cellspacing="0" width="100%">
      <thead style="background-color: #f2f2f2;">
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Items</th>
          <th>Grand Total (LKR)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let invoice of invoices">
          <td>{{ invoice.invoiceId }}</td>
          <td>{{ invoice.customerName }}</td>
          <td>{{ invoice.invoiceDate | date: 'shortDate' }}</td>
         <td>
  <ul style="margin:0; padding-left: 15px;">
    <li *ngFor="let item of invoice.invoiceItems || []">
      {{ item.item?.name || ('Item #' + item.itemId) }}
      (x{{ item.quantity }}) - {{ item.total | currency:'LKR':'symbol':'1.2-2' }}
    </li>
  </ul>
</td>
<td>{{ invoice.grandTotal | currency:'LKR':'symbol':'1.2-2' }}</td>
          <td>
            <button 
              (click)="viewInvoice(invoice.invoiceId)" 
              style="background-color: #2196F3; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
              View
            </button>
            &nbsp;
            <button 
              (click)="removeInvoice(invoice.invoiceId)" 
              style="background-color: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ListInvoicesComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  invoices: any[] = [];

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.api.getInvoices().subscribe({
      next: (res: any[]) => {
        this.invoices = res || [];
      },
      error: (err: any) => console.error('Error loading invoices:', err)
    });
  }

  addInvoice() {
    this.router.navigate(['/invoices/add']);
  }

  viewInvoice(id: number) {
    this.router.navigate(['/invoices/view', id]);
  }

  removeInvoice(id: number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.api.removeInvoice(id).subscribe({
        next: () => this.loadInvoices(),
        error: (err: any) => console.error('Error deleting invoice:', err)
      });
    }
  }

  calculateGrandTotal(items: any[]): number {
    return items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }
}
