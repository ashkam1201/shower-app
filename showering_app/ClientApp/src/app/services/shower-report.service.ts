import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowerReport } from '../fetch-data/fetch-data.component'; // Import the ShowerReport interface from the appropriate location


@Injectable({
  providedIn: 'root'
})
export class ShowerReportService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  getShowerReports(): Observable<ShowerReport[]> {
    return this.http.get<ShowerReport[]>(this.baseUrl + 'ShowerReport');
  }

  addShowerReport(showerReport: ShowerReport): Observable<ShowerReport> {
    return this.http.post<ShowerReport>(this.baseUrl + 'ShowerReport', showerReport);
  }
  
  
  updateShowerReport(showerReport: ShowerReport): Observable<ShowerReport> {
    return this.http.put<ShowerReport>(this.baseUrl + 'ShowerReport/' + showerReport.id, showerReport);
  }

  deleteShowerReport(reportId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'ShowerReport/' + reportId);
  }  

}
