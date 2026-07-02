import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  updateCustomer(id: string, customer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}