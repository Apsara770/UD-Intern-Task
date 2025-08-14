import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-invoice.html' // or keep inline template
})
export class AddInvoiceComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  items: any[] = [];

  invoice = {
    customerName: '',
    grandTotal: 0,
    invoiceItems: [
      { itemId: null as number | null, price: 0, quantity: 1, total: 0 }
    ]
  };

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.api.getItems().subscribe({
      next: (res: any[]) => this.items = res || [],
      error: err => console.error('Error loading items:', err)
    });
  }

  addRow() {
    this.invoice.invoiceItems.push({ itemId: null, price: 0, quantity: 1, total: 0 });
  }

  removeRow(index: number) {
    this.invoice.invoiceItems.splice(index, 1);
    this.updateGrandTotal();
  }

  onItemChange(index: number) {
    const row = this.invoice.invoiceItems[index];
    const selectedItem = this.items.find(item => item.itemId === row.itemId);
    if (selectedItem) {
      row.price = selectedItem.price;
      this.updateLineTotal(index);
    } else {
      row.price = 0;
      row.total = 0;
      this.updateGrandTotal();
    }
  }

  updateLineTotal(index: number) {
    const row = this.invoice.invoiceItems[index];
    row.total = row.price * row.quantity;
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.invoice.grandTotal = this.invoice.invoiceItems.reduce((sum, row) => sum + row.total, 0);
  }

  onSubmit() {
    // Filter out rows with null itemId and map DTO
    const itemsDto = this.invoice.invoiceItems
      .filter(row => row.itemId != null)
      .map(row => ({
        ItemId: row.itemId!, // Non-null assertion fixes TS18047
        Quantity: row.quantity
      }));

    if (itemsDto.length === 0) {
      alert('Please select at least one item.');
      return;
    }

    const dto = {
      CustomerName: this.invoice.customerName,
      InvoiceDate: new Date().toISOString(),
      Items: itemsDto
    };

    console.log('Sending DTO:', dto);

    this.api.createInvoice(dto).subscribe({
      next: () => this.router.navigate(['/invoices']),
      error: err => console.error('Error creating invoice:', err)
    });
  }
}
