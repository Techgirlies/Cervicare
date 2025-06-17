import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: string;
}

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  };

  isSubmitting = false;
  isSubmitted = false;

  contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      title: 'Email Us',
      details: [
        'General Information: info@cervicalcare.org',
        'Medical Questions: medical@cervicalcare.org',
        'Support Services: support@cervicalcare.org'
      ]
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: [
        'Main Line: +254 (0) 20 123 4567',
        'Toll Free: 0800 PREVENT (0800 773 8368)',
        'Emergency: +254 (0) 722 123 456'
      ]
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: [
        'Cervical Cancer Prevention Center',
        'Westlands, Nairobi',
        'Kenya'
      ]
    },
    {
      icon: '🕒',
      title: 'Office Hours',
      details: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 4:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  emergencyContacts = [
    {
      service: 'Emergency Medical Services',
      number: '999',
      description: 'For immediate medical emergencies'
    },
    {
      service: 'Cancer Helpline',
      number: '0800 CANCER',
      description: '24/7 cancer support and information'
    },
    {
      service: 'Women\'s Health Hotline',
      number: '+254 (0) 711 WOMEN',
      description: 'Specialized women\'s health support'
    }
  ];

  subjectOptions = [
    'General Information',
    'Appointment Scheduling',
    'Medical Consultation',
    'Support Services',
    'Educational Resources',
    'Volunteer Opportunities',
    'Partnership Inquiries',
    'Other'
  ];

  onSubmit(): void {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.resetForm();
      }, 2000);
    }
  }

  private isValidForm(): boolean {
    return !!(
      this.contactForm.name &&
      this.contactForm.email &&
      this.contactForm.subject &&
      this.contactForm.message
    );
  }

  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: 'email'
    };
  }

  closeSuccessMessage(): void {
    this.isSubmitted = false;
  }
}




