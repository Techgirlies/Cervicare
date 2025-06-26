import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cervicare-frontend';

  menuItems = [
    { label: 'Patient Summary', route: '/dashboard/patients', icon: '👥' },
    { label: 'Risk Assessment', route: '/dashboard/risk-assessment', icon: '⚠️' },
    { label: 'Care Recommendations', route: '/dashboard/care-recommendations', icon: '💊' },
    { label: 'Inventory', route: '/dashboard/inventory', icon: '📦' },
    { label: 'Financial Planning', route: '/dashboard/financial', icon: '💰' },
    { label: 'Scheduling', route: '/dashboard/scheduling', icon: '📅' },
    { label: 'Settings', route: '/dashboard/settings', icon: '⚙️' }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Auto-redirect to dashboard if logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
