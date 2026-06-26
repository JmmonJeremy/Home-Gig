import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly querySubject = new BehaviorSubject<string>('');

  readonly query$ = this.querySubject.asObservable();

  get query(): string {
    return this.querySubject.value;
  }

  setQuery(value: string): void {
    this.querySubject.next(value);
  }

  clearQuery(): void {
    this.querySubject.next('');
  }
}
