import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
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

  ngOnInit(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.startDate = this.toInputDate(firstDay);
    this.endDate = this.toInputDate(lastDay);
  }

  generateSpreadsheet(): void {
    if (!this.startDate || !this.endDate) {
      this.errorMessage = 'Please select a start date and end date.';
      return;
    }

    if (this.startDate > this.endDate) {
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
    const start = new Date(`${this.startDate}T00:00:00`);
    const month = start.toLocaleString('en-US', { month: 'short' });
    const year = start.getFullYear();

    return `Orders_Payments_${month}${year}.csv`;
  }

  private toInputDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
