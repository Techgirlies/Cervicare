import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
    this.error = '';
    
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}


// // In your login component
// onLogin() {
//   if (this.loginForm.valid) {
//     this.isLoading = true;
//     this.errorMessage = '';
    
//     const { email, password } = this.loginForm.value;
    
//     this.authService.login(email, password).subscribe({
//       next: (response) => {
//         this.isLoading = false;
//         if (response.success) {
//           console.log('Login successful!');
//           // Redirect to dashboard or home page
//           this.router.navigate(['/dashboard']);
//         }
//       },
//       error: (error) => {
//         this.isLoading = false;
//         console.error('Login failed:', error);
//         this.errorMessage = error.error?.message || 'Login failed. Please try again.';
//       }
//     });
//   }
// }
