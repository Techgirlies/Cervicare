import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [] // your other imports
})
export class DashboardComponent {
  constructor(private router: Router) {}
  addNewPatient() {
    this.router.navigate(['/dashboard/risk-assessment']);
  }
  scheduleAppointment() {
    this.router.navigate(['/dashboard/scheduling']);
  }

  viewReports() {
    this.router.navigate(['/dashboard/financial']); // or your reports route
  }

  updateInventory() {
    this.router.navigate(['/dashboard/inventory']);
  }
}
