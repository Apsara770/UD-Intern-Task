import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Add New Item</h2>
    <form (ngSubmit)="onSubmit(itemForm)" #itemForm="ngForm">
      <label>Name:</label>
      <input type="text" name="name" [(ngModel)]="item.name" required>

      <label>Price:</label>
      <input type="number" name="price" [(ngModel)]="item.price" required>

      <label>Stock Quantity:</label>
      <input type="number" name="stockQuantity" [(ngModel)]="item.stockQuantity" required>

      <button type="submit" [disabled]="itemForm.invalid">Save</button>
    </form>

    <button (click)="getData()">Get data and display console</button>

    <p *ngIf="message">{{ message }}</p>
  `
})
export class AddItemComponent {
  item = {
    name: '',
    price: 0,
    stockQuantity: 0
  };
  message: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.apiService.createItem(this.item).subscribe({
      next: (res) => {
        console.log('Item saved', res);
        this.message = 'Item saved successfully!';
        form.resetForm();
      },
      error: (err) => {
        console.error('Error saving item', err);
        this.message = 'Failed to save item!';
      }
    });
  }

  getData() {
    this.apiService.getItems().subscribe({
      next: (data) => {
        console.log('Items:', data);
        this.message = 'Data printed in console!';
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error fetching data.';
      }
    });
  }
}
