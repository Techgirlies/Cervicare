import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    license: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  };
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    
    // Validation
    if (!this.formData.name || !this.formData.email || !this.formData.license || 
        !this.formData.specialization || !this.formData.password || !this.formData.confirmPassword) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.formData.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    if (this.authService.register(this.formData)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Registration failed. Please try again.';
    }
  }
}