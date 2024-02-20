import { Component, OnInit } from '@angular/core';
import { ShowerReportService, ShowerReport } from '../services/shower-report.service'; // Make sure the path is correct

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  public currentCount = 0; // This will now represent showers in the last week
  public message = '';

  constructor(private showerReportService: ShowerReportService) {}

  ngOnInit() {
    this.showerReportService.getShowerReports().subscribe(
      (reports: ShowerReport[]) => {
        this.calculateShowersLastWeek(reports);
      },
      (error) => console.error(error)
    );
  }

  private calculateShowersLastWeek(reports: ShowerReport[]) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const showersLastWeek = reports.filter(report => {
      const reportDate = new Date(report.date);
      return reportDate >= oneWeekAgo;
    }).length;

    // Set the current count to the number of showers in the last week
    this.currentCount = showersLastWeek;

    // Update the message based on the number of showers in the last week
    this.message = showersLastWeek > 3
      ? 'Good job, you are taking more than 3 showers per week!'
      : 'Keep going, you are on your way to shower more frequently!';
  }
}
