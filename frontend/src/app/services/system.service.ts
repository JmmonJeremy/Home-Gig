import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private apiUrl = environment.apiUrl + '/system';
  private goServiceUrl = environment.goServiceUrl;

  constructor(private http: HttpClient) {}

  getSystemStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status`);
  }

  wakeGoService(): Observable<any> {
    return this.http.get<any>(`${this.goServiceUrl}/status`);
  }
}