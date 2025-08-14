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
      <div class="card shadow-sm border-0 rounded">
        <div class="card-body">
          <h2 class="card-title mb-4 fw-bold">Add New Item</h2>

          <form (ngSubmit)="onSubmit()" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="name" class="form-label fw-semibold">Name</label>
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
              <label for="price" class="form-label fw-semibold">Price (LKR)</label>
              <input
               
                id="price"
                class="form-control"
                [(ngModel)]="item.price"
                name="price"
                required
              >
            </div>

            <div class="mb-3">
              <label for="stockQuantity" class="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                id="stockQuantity"
                class="form-control"
                [(ngModel)]="item.stockQuantity"
                name="stockQuantity"
                required
              >
            </div>

            <div class="d-flex justify-content-start">
              <button type="submit" class="btn btn-success shadow-sm me-2">
                <i class="bi bi-check-circle"></i> Save
              </button>
              <button
                type="button"
                class="btn btn-secondary shadow-sm"
                (click)="router.navigate(['/items'])"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
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
