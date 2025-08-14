import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:7158/api'; // HTTP for dev

  // Items
  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  getItemById(id: number): Observable<any> {   
  return this.http.get(`${this.baseUrl}/items/${id}`);
}

  createItem(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/items/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`);
  }

  // Invoices
createInvoice(dto: any) {
  return this.http.post(`${this.baseUrl}/invoices`, dto);
}


  getInvoices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices`);
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/${id}`);
  }

    // Delete invoice by ID
  removeInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/invoices/${id}`);
  }
}
