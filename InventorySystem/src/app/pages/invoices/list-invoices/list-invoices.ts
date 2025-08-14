import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-list-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-invoices.html'
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
        console.log('Invoices loaded:', this.invoices);
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
}
