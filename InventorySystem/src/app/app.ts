import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <!-- Header -->
      <header class="bg-primary text-white py-3 mb-4">
        <div class="container d-flex justify-content-between align-items-center">
          <h1 class="h3 mb-0">Inventory and Invoice System</h1>

        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-fill">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-light text-center py-3 mt-auto border-top">
        <div class="container">
          <small>&copy; 2025 Inventory & Invoice System. All rights reserved.</small>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {}
