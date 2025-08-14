import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-view-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-invoice.html'
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
