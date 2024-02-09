import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({ 
  providedIn: 'root'
})
export class ShowerReportService {
  private baseUrl: string = environment.apiUrl;
  private apiUrl = 'https://localhost:7250/api/ShowerReport/'; // Adjust according to your actual API URL


  constructor(private http: HttpClient) {}

  getShowerReports(): Observable<ShowerReport[]> {
    return this.http.get<ShowerReport[]>(this.baseUrl + 'api/ShowerReport/');
  }

  addShowerReport(showerReport: ShowerReport): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.baseUrl + 'api/ShowerReport/', showerReport, { headers });
  }
  
  
  
  updateShowerReport(showerReport: ShowerReport): Observable<ShowerReport> {
    return this.http.put<ShowerReport>(this.baseUrl + 'api/ShowerReport/' + showerReport, showerReport);
  }

  deleteShowerReport(reportId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}api/ShowerReport/${reportId}`);
  }
  

}

export interface ShowerReport {
  date: string; // Use string to match the input type
  hair: boolean;
  body: boolean;
  shampoo: string;
  showerGel: string;
}
