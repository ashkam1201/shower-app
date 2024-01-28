import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowerReportService } from '../services/shower-report.service'; // Import the service

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public report: ShowerReport[] = [];

  constructor(
    private showerReportService: ShowerReportService, // Inject the service
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    // Call the service method to get shower reports
    this.showerReportService.getShowerReports().subscribe(result => {
      this.report = result;
    }, error => console.error(error));
  }
}

 export interface ShowerReport {
  id: number | null; // Use union type to allow null
  date: Date| null;
  hair: boolean;
  body: boolean;
  shampoo?: string | null;
  showerGel?: string | null;
}
