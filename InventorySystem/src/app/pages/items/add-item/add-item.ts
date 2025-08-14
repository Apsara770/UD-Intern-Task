import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./add-item.css'],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Add Item</h2>
      <form (ngSubmit)="onSubmit()" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input
            type="text"
            id="name"
            class="form-control"
            [(ngModel)]="item.name"
            name="name"
            required
          >
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price:</label>
          <input
            type="number"
            id="price"
            class="form-control"
            [(ngModel)]="item.price"
            name="price"
            required
          >
        </div>

        <div class="mb-3">
          <label for="stockQuantity" class="form-label">Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            class="form-control"
            [(ngModel)]="item.stockQuantity"
            name="stockQuantity"
            required
          >
        </div>

        <button type="submit" class="btn btn-success">
          <i class="bi bi-check-circle"></i> Save
        </button>
        <button type="button" class="btn btn-secondary ms-2" (click)="router.navigate(['/items'])">
          Cancel
        </button>
      </form>
    </div>
  `
})
export class AddItemComponent {
  item = { name: '', price: 0, stockQuantity: 0 };

  constructor(private api: ApiService, public router: Router) {}

  onSubmit() {
    this.api.createItem(this.item).subscribe({
      next: () => this.router.navigate(['/items']),
      error: err => console.error(err)
    });
  }
}
