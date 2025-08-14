import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./add-item.html`,
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
