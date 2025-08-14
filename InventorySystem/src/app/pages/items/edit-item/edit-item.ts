import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item.html'
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
