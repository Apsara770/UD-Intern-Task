import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="d-flex flex-column min-vh-100 bg-light">
      <!-- Header -->
      <header class="bg-primary text-white shadow-sm">
        <div class="container d-flex justify-content-between align-items-center py-3">
          <h1 class="h4 mb-0 fw-bold">Inventory & Invoice System</h1>
          <nav class="nav">
            <a [routerLink]="'/invoices'" class="nav-link text-white">Invoices</a>
            <a [routerLink]="'/items'" class="nav-link text-white">Items</a>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-fill py-4">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-dark text-white text-center py-3 mt-auto">
        <div class="container">
          <small>&copy; 2025 Inventory & Invoice System. All rights reserved.</small>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {}
