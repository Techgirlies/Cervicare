import { Injectable, signal } from '@angular/core';

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
  private isLoggedIn = signal<boolean>(false);

  // Expose as readonly signal for components to use
  getIsLoggedIn = this.isLoggedIn.asReadonly();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const stored = localStorage.getItem('cervicare_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      this.isLoggedIn.set(true); // ✅ set signal on reload
    }
  }

  login(email: string, password: string): boolean {
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
      this.isLoggedIn.set(true); // ✅ signal true
      return true;
    }
    return false;
  }

  register(userData: any): boolean {
    this.currentUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'Healthcare Provider',
      license: userData.license,
      specialization: userData.specialization
    };
    localStorage.setItem('cervicare_user', JSON.stringify(this.currentUser));
    this.isLoggedIn.set(true); // ✅ signal true
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('cervicare_user');
    this.isLoggedIn.set(false); // ✅ signal false
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
