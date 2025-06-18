import { Injectable } from '@angular/core';


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

  constructor() {
    this.loadUserFromStorage();
  }
   private loadUserFromStorage() {
    const stored = localStorage.getItem('cervicare_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  login(email: string, password: string): boolean {
    // Simulate login - replace with actual API call
    if (email && password) {
      this.currentUser = {
        id: '1',
        name: 'Sarah Johnson',
        email: email,
        role: 'Healthcare Provider',
        license: 'MD-2024-001',
        specialization: 'Gynecology'
      };
      localStorage.setItem('cervicare_user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  register(userData: any): boolean {
    // Simulate registration - replace with actual API call
    this.currentUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'Healthcare Provider',
      license: userData.license,
      specialization: userData.specialization
    };
    localStorage.setItem('cervicare_user', JSON.stringify(this.currentUser));
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('cervicare_user');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}



