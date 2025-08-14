import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-items.html', // make sure this file exists

})
export class ListItemsComponent implements OnInit {
  items: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.api.getItems().subscribe({
      next: res => {
        this.items = res;
        console.log('Items loaded:', this.items);
      },
      error: err => console.error(err)
    });
  }

  addItem() {
    this.router.navigate(['/items/add']);
  }

  editItem(id: number) {
    this.router.navigate(['/items/edit', id]);
  }

  deleteItem(id: number) {
    if (confirm('Are you sure?')) {
      this.api.deleteItem(id).subscribe({
        next: () => this.loadItems(),
        error: err => console.error(err)
      });
    }
  }
}
