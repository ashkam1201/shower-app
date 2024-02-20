import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ensure the path is updated to the correct one
import { ShowerReportService, ShowerReport } from '../services/shower-report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showerReport: ShowerReport = this.getInitialShowerReport();

  constructor(
    private showerReportService: ShowerReportService,
    public authService: AuthService // Added to inject the AuthService
  ) {}

  getInitialShowerReport(): ShowerReport {
    return {
      date: '',
      hair: false,
      body: false,
      shampoo: '',
      showerGel: '',
    };
  }

  submitForm(): void {
    if (this.isValidShowerReport(this.showerReport)) {
      const showerReportToSend: ShowerReport = {
        ...this.showerReport,
        date: this.formatDate(this.showerReport.date)
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
    const date = new Date(showerReport.date);
    return !isNaN(date.getTime());
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString); // Assuming dateString is the input for your formatDate
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T00:00:00`;
  }  

  private resetForm(): void {
    this.showerReport = this.getInitialShowerReport();
    // Additional logic to reset any UI state or form controls if necessary
  }
}
