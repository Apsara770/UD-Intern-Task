import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./edit-item.css'],
  template: `
    <div class="container my-4">
      <h2 class="mb-4">Edit Item</h2>

      <form *ngIf="item" (ngSubmit)="onSubmit()" class="needs-validation" novalidate>
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

        <button type="submit" class="btn btn-primary">
          <i class="bi bi-pencil-square"></i> Update
        </button>
        <button type="button" class="btn btn-secondary ms-2" (click)="router.navigate(['/items'])">
          Cancel
        </button>
      </form>
    </div>
  `
})
export class EditItemComponent implements OnInit {
  api = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  item: any;
  itemId!: number;

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.params['id']);
    this.api.getItemById(this.itemId).subscribe({
      next: (res: any) => {
        this.item = res;
      },
      error: (err: any) => console.error(err)
    });
  }

  onSubmit() {
    this.api.updateItem(this.itemId, this.item).subscribe({
      next: () => this.router.navigate(['/items']),
      error: err => console.error(err)
    });
  }
}
