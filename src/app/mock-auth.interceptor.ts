import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const mockAuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor caught request:', req.method, req.url);



  // Mock users database
  const mockUsers = [
  { 
    id: '1', 
    email: 'doctor@cervicare.com', 
    password: 'password123', 
    name: 'Dr. Sarah Johnson',
    role: 'Healthcare Provider',
    license: 'MD-2024-001',
    specialization: 'Gynecology'
  },
  { 
    id: '2', 
    email: 'admin@cervicare.com', 
    password: 'admin123', 
    name: 'Admin User',
    role: 'Administrator',
    license: 'ADM-2024-001',
    specialization: 'Administration'
  }
];


  // LOGIN ENDPOINT
  if (req.url.includes('/api/login') && req.method === 'POST') {
    console.log('Login request intercepted');
    const { email, password } = req.body as any;
    
    return of(null).pipe(
      delay(1000), // 1 second delay to simulate network
      switchMap(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const mockResponse = {
            success: true,
            message: 'Login successful',
            token: 'mock-jwt-token-' + Date.now(),
            user: { 
              id: user.id, 
              email: user.email, 
              name: user.name 
            }
          };
          
          console.log('Login successful, returning:', mockResponse);
          return of(new HttpResponse({ 
            status: 200, 
            body: mockResponse 
          }));
        } else {
          console.log('Login failed - invalid credentials');
          return throwError(() => ({
            status: 401,
            error: {
              success: false,
              message: 'Invalid email or password'
            }
          }));
        }
      })
    );
  }

  // REGISTER ENDPOINT
  if (req.url.includes('/api/register') && req.method === 'POST') {
    console.log('Register request intercepted');
    const { email, password, name } = req.body as any;
    
    return of(null).pipe(
      delay(1000),
      switchMap(() => {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          console.log('Registration failed - user exists');
          return throwError(() => ({
            status: 409,
            error: {
              success: false,
              message: 'User with this email already exists'
            }
          }));
        }
        
        // Create new user
        const newUser = {
          id: mockUsers.length + 1,
          email,
          password,
          name
        };
        
        // mockUsers.push(newUser);
        
        const mockResponse = {
          success: true,
          message: 'Registration successful! You can now login.',
          user: { 
            id: newUser.id, 
            email: newUser.email, 
            name: newUser.name 
          }
        };
        
        console.log('Registration successful, returning:', mockResponse);
        return of(new HttpResponse({ 
          status: 201, 
          body: mockResponse 
        }));
      })
    );
  }

  // Let all other requests pass through to the real backend (if any)
  console.log('Request passed through:', req.url);
  return next(req);
};