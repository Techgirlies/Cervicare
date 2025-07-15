import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientSummaryComponent } from './components/patient-summary/patient-summary.component';
import { InventoryComponent } from './components/inventory/inventory.component';


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
    loadComponent: () => import('./pages/about/about.component').then(m=>m.AboutComponent)
  },
    { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m=>m.RegisterComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m =>m.DashboardComponent)
  },
  { 
    path: 'inventory', 
    loadComponent: () => import('./components/inventory/inventory.component').then(m =>m.InventoryComponent)
  },
  { 
    path: 'care-recommendation', 
    loadComponent: () => import('./components/care-recommendation/care-recommendation.component').then(m =>m.CareRecommendationComponent)
  },
  { 
    path: 'financial-planning', 
    loadComponent: () => import('./components/financial-summary/financial-summary.component').then(m =>m.FinancialSummaryComponent)
  },
  { 
    path: 'patient-summary', 
    loadComponent: () => import('./components/patient-summary/patient-summary.component').then(m =>m.PatientSummaryComponent)
  },
  { 
    path: 'risk-assesment', 
    loadComponent: () => import('./components/risk-assessment/risk-assessment.component').then(m =>m.RiskAssessmentComponent)
  },
  { path: '**', redirectTo: '/login' },
 
];
