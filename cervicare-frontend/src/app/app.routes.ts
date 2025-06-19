import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'faqs', 
    loadComponent: () => import('./pages/faqs/faqs.component').then(m => m.FaqsComponent)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'dashboard/risk-assessment', 
    loadComponent: () => import('./components/dashboard/risk-assesment/risk-assesment.component').then(m => m.RiskAssesmentComponent)
  },
  { 
    path: 'dashboard/care-recommendations', 
    loadComponent: () => import('./components/dashboard/care-recommendations/care-recommendations.component').then(m => m.CareRecommendationsComponent)
  },
  { 
    path: 'dashboard/inventory', 
    loadComponent: () => import('./components/dashboard/inventory/inventory.component').then(m => m.InventoryComponent)
  },
  { 
    path: 'dashboard/financial', 
    loadComponent: () => import('./components/dashboard/financial/financial.component').then(m => m.FinancialComponent)
  },
  { 
    path: 'dashboard/scheduling', 
    loadComponent: () => import('./components/dashboard/scheduling/scheduling.component').then(m => m.SchedulingComponent)
  },
  { 
    path: 'dashboard/settings', 
    loadComponent: () => import('./components/dashboard/settings/settings.component').then(m => m.SettingsComponent)
  },
  { path: '**', redirectTo: '/login' }
];
