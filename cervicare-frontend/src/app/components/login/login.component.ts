import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router'; // ✅ ADD THIS

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ INCLUDE RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 onSubmit() {
  console.log("Sign In button clicked");
  this.error = '';

  if (!this.email || !this.password) {
    this.error = 'Email and password are required.';
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      console.log("Login success:", res);  // <-- Add this
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error("Login failed:", err);  // <-- And this
      this.error = 'Invalid credentials. Please try again.';
    }
  });
}


}
