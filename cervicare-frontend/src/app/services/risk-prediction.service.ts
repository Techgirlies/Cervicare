import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskPredictionService {
  private apiUrl = 'http://localhost:8000/predict';

  constructor(private http: HttpClient) {}

  predictRisk(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, input);
  }
}
