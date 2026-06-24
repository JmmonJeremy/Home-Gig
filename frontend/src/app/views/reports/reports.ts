import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  reportType = 'Orders & Payments';
  format = 'CSV';
  startDate = '';
  endDate = '';

  generatedFileName = '';
  spreadsheetReady = false;
  isGenerating = false;
  errorMessage = '';

  private csvBlob: Blob | null = null;

  constructor(private reportService: ReportService) {}

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
}
