import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowerReportService, ShowerReport } from '../services/shower-report.service'; // Import the service

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
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

  deleteReport(reportId?: number) {
    if (typeof reportId === 'undefined') {
      console.error('Report ID is undefined.');
      return;
    }
    if(confirm("Are you sure to delete this report?")) {
      this.showerReportService.deleteShowerReport(reportId).subscribe(() => {
        // On successful deletion, remove the report from the report array
        this.report = this.report.filter(report => report.id !== reportId);
        console.log(`Report with ID ${reportId} deleted successfully.`);
      }, error => {
        console.error('Error deleting the report:', error);
        // Handle any errors here, such as showing an alert to the user
      });
    }
  }
}