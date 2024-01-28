import { Component } from '@angular/core';
import { ShowerReportService } from '../services/shower-report.service';
import { ShowerReport } from '../fetch-data/fetch-data.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent {
  showerReport: ShowerReport = {
    id: null,
    date: null,
    hair: false,
    body: false,
    shampoo: null,
    showerGel: null,
  };

  constructor(private showerReportService: ShowerReportService) {}

  submitForm() {
    this.showerReportService.addShowerReport(this.showerReport).subscribe(
      (response) => {
        // Handle the response if needed (e.g., show a success message)
        console.log('Shower report added successfully:', response);
        
        // Clear the form
        this.showerReport = {
          id: null,
          date: null,
          hair: false, // Reset to false
          body: false, // Reset to false
          shampoo: null,
          showerGel: null,
          // Reset other properties if needed
        };
      },
      (error) => {
        // Handle any errors (e.g., show an error message)
        console.error('Error adding shower report:', error);
      }
    );
  }
}
