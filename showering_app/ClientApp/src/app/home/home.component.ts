import { Component } from '@angular/core';
import { ShowerReportService, ShowerReport } from '../services/shower-report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showerReport: ShowerReport = this.getInitialShowerReport();

  constructor(private showerReportService: ShowerReportService) {}

  getInitialShowerReport(): ShowerReport {
    // Having a method to initialize the form helps to reset it after submission or on initialization
    return {
      date: '', // Use empty string for the initial value to avoid null checks
      hair: false,
      body: false,
      shampoo: '',
      showerGel: '',
    };
  }

  submitForm(): void {
    // Check if the date is valid
    const dateValue = this.showerReport.date ? new Date(this.showerReport.date) : null;
  
    if (dateValue && !isNaN(dateValue.getTime())) {
      // Format the date to the expected format by your backend
      const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}T00:00:00`;
      console.log(formattedDate);
  
      // Construct the object with the formatted date string
      const showerReportToSend: ShowerReport = {
        ...this.showerReport,
        date: formattedDate
      };
      console.log(showerReportToSend);
      this.showerReportService.addShowerReport(showerReportToSend).subscribe(
        (response) => {
          console.log('Shower report added successfully:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding shower report:', error);
        }
      );
    } else {
      console.error('Form is not valid.');
    }
  }
  
  
  
  
  private isValidShowerReport(showerReport: ShowerReport): boolean {
    // Perform validation, e.g., checking if the date is a valid date string
    // Here we try to parse the date and check if the result is not an Invalid Date
    const date = new Date(showerReport.date);
    return !isNaN(date.getTime());
  }
  
  
  private resetForm(): void {
    this.showerReport = this.getInitialShowerReport();
    // Additional logic to reset any UI state or form controls if necessary
  }
  
}
