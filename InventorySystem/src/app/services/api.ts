import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7158/api'; // Use HTTPS if API runs with HTTPS

  // ===== Items =====
  getItems(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/items`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/items`, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/items/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/items/${id}`);
  }

  // ===== Invoices =====
  createInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/invoices`, invoice);
  }

  getInvoices(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/invoices`);
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/invoices/${id}`);
  }
}
