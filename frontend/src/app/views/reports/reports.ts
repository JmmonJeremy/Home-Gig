import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit, OnDestroy {
  reportType = 'Orders & Payments';
  format = 'CSV';
  startDate = '';
  endDate = '';
  searchQuery = '';
  reportMatches: string[] = [];

  generatedFileName = '';
  spreadsheetReady = false;
  isGenerating = false;
  errorMessage = '';

  private csvBlob: Blob | null = null;
  private readonly subscriptions = new Subscription();

  constructor(
    private reportService: ReportService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.query$.subscribe((query) => {
        this.searchQuery = query;
        this.updateReportMatches();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  generateSpreadsheet(): void {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      this.errorMessage = 'Start date must be on or before end date.';
      return;
    }

    this.isGenerating = true;
    this.errorMessage = '';
    this.spreadsheetReady = false;
    this.csvBlob = null;
    this.generatedFileName = '';

    this.reportService.generateOrdersPaymentsCsv(this.startDate, this.endDate).subscribe({
      next: (blob) => {
        this.csvBlob = blob;
        this.generatedFileName = this.buildFileName();
        this.spreadsheetReady = true;
        this.isGenerating = false;
        this.updateReportMatches();
      },
      error: () => {
        this.errorMessage = 'Failed to generate spreadsheet.';
        this.isGenerating = false;
      }
    });
  }

  downloadSpreadsheet(): void {
    if (!this.csvBlob) {
      return;
    }

    const url = window.URL.createObjectURL(this.csvBlob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = this.generatedFileName;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  private buildFileName(): string {
    if (this.startDate && this.endDate) {
      return `Orders_Payments_${this.startDate}_to_${this.endDate}.csv`;
    }

    if (this.startDate) {
      return `Orders_Payments_from_${this.startDate}.csv`;
    }

    if (this.endDate) {
      return `Orders_Payments_through_${this.endDate}.csv`;
    }

    return 'Orders_Payments_All.csv';
  }

  private updateReportMatches(): void {
    const query = this.normalize(this.searchQuery);
    const searchableContent = [
      `Report Type ${this.reportType}`,
      `Spreadsheet Format ${this.format}`,
      `Start Date ${this.startDate}`,
      `End Date ${this.endDate}`,
      this.spreadsheetReady ? 'Spreadsheet Ready' : 'Awaiting Generation',
      this.generatedFileName
    ].filter(Boolean);

    if (!query) {
      this.reportMatches = [];
      return;
    }

    this.reportMatches = searchableContent.filter((item) =>
      this.normalize(item).includes(query)
    );
  }

  private normalize(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    return String(value).toLowerCase().trim();
  }
}
