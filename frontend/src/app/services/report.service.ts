import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) {}

  generateOrdersPaymentsCsv(startDate: string, endDate: string): Observable<Blob> {
    let params = new HttpParams();

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/orders-payments.csv`, {
      params,
      responseType: 'blob'
    });
  }
}
