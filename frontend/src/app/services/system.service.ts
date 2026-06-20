import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private apiUrl = 'http://localhost:3000/api/system';

  constructor(private http: HttpClient) {}

  getSystemStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status`);
  }
}