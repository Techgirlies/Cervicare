import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  license?: string;
  specialization?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private apiUrl = 'http://localhost:8081/api/users'; // Backend URL

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const stored = localStorage.getItem('cervicare_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  register(userData: any): Observable<any> {
    const payload = {
      fullName: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'DOCTOR' // or 'PATIENT'
    };

    return this.http.post(`${this.apiUrl}/register`, payload, { responseType: 'text' });
  }

login(email: string, password: string): Observable<any> {
  const payload = { email, password };

  return this.http.post(`${this.apiUrl}/login`, payload, {
    headers: {
      'Content-Type': 'application/json'  // ✅ IMPORTANT: Tell backend you're sending JSON
    },
    responseType: 'text'
  }).pipe(
    tap((token: string) => {
      localStorage.setItem('cervicare_token', token);
    })
  );
}
  logout() {
    this.currentUser = null;
    localStorage.removeItem('cervicare_user');
    localStorage.removeItem('cervicare_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('cervicare_token');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
