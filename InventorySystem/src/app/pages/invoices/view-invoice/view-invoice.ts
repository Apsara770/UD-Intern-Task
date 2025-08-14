import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-view-invoice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Invoice Details</h2>
    <div *ngIf="invoice">
      <p><strong>ID:</strong> {{ invoice.id }}</p>
      <p><strong>Customer:</strong> {{ invoice.customerName }}</p>
      <p><strong>Total:</strong> {{ invoice.total }}</p>
    </div>
  `
})
export class ViewInvoiceComponent implements OnInit {
  api = inject(ApiService);
  route = inject(ActivatedRoute);

  invoice: any;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.api.getInvoiceById(id).subscribe({
      next: res => this.invoice = res,
      error: err => console.error(err)
    });
  }
}
