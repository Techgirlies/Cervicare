import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageInfo, PatientData } from '../../models/patientInfo';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-patient-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,MatIconModule,MatFormFieldModule,MatInputModule,
    MatSelectModule,MatOptionModule,MatRadioModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent {
  @Output() patientAdded = new EventEmitter<PatientData>();

  currentPage = 1;
  totalPages = 7;
  patientForm: FormGroup;

  pages: PageInfo[] = [
    { num: 1, title: 'Personal Details', icon: 'person' },
    { num: 2, title: 'Medical History', icon: 'favorite' },
    { num: 3, title: 'Gynecological History', icon: 'calendar_today' },
    { num: 4, title: 'Sexual Health', icon: 'security' },
    { num: 5, title: 'Screening History', icon: 'description' },
    { num: 6, title: 'Lifestyle Factors', icon: 'favorite' },
    { num: 7, title: 'Symptoms', icon: 'check_circle' }
  ];

  menstrualCycleOptions = [ 
    { value: 'regular', label: 'Regular' },
    { value: 'irregular', label: 'Irregular' },
    { value: 'stopped', label: 'Stopped (Menopause)' }
    ];


  contraceptiveOptions = [
    { value: 'none', label: 'None' },
    { value: 'pill', label: 'Birth Control Pill' },
    { value: 'iud', label: 'IUD' },
    { value: 'condoms', label: 'Condoms' },
    { value: 'injection', label: 'Injection' },
    { value: 'implant', label: 'Implant' },
    { value: 'other', label: 'Other' }
  ];

  partnerOptions = [
    { value: '1', label: '1' },
    { value: '2-3', label: '2-3' },
    { value: '4-5', label: '4-5' },
    { value: '6-10', label: '6-10' },
    { value: 'more-than-10', label: 'More than 10' }
  ];

  testResultOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Abnormal' },
    { value: 'unknown', label: 'Unknown' },
    { value: 'never-tested', label: 'Never Tested' }
  ];

  hpvResultOptions = [
    { value: 'negative', label: 'Negative' },
    { value: 'positive', label: 'Positive' },
    { value: 'unknown', label: 'Unknown' },
    { value: 'never-tested', label: 'Never Tested' }
  ];

  smokingOptions = [
    { value: 'never', label: 'Never Smoked' },
    { value: 'former', label: 'Former Smoker' },
    { value: 'current', label: 'Current Smoker' }
  ];

  alcoholOptions = [
    { value: 'never', label: 'Never' },
    { value: 'occasional', label: 'Occasional' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'heavy', label: 'Heavy' }
  ];

constructor(private formBuilder: FormBuilder) {
    this.patientForm = this.formBuilder.group({
      //personal details
  fullName: ['',[Validators.required]],
  age: ['',[Validators.required,Validators.min(1),Validators.max(120)]],
  email: ['',[Validators.email]],
  phoneNumber: ['',[Validators.required]],
  address: [''],
  emergencyContact: [''],
  emergencyPhone: [''],
  
  // Medical History
  chronicConditions: [''],
  currentMedications: [''],
  allergies:[''],
  previousSurgeries: [''],
  familyHistory: [''],
  
  // Gynecological History
  ageFirstMenstruation: [''],
  menstrualCycle: [''],
  lastMenstrualPeriod: [''],
  pregnancies: [''],
  livebirths: [''],
  miscarriages: [''],
  contraceptiveMethod: [''],
  
  // Sexual Health
  ageFirstSexualActivity: [''],
  numberOfPartners: [''],
  currentlyActive: [''],
  partnerSTIHistory:[''],
  
  // Screening History
  lastPapSmear: [''],
  papSmearResults: [''],
  lastHPVTest: [''],
  hpvResults: [''],
  abnormalResults:[''],
  
  // Lifestyle Factors
  smokingStatus: [''],
  smokingDuration: [''],
  alcoholConsumption: [''],
  immunocompromised: [''],
  
  // Symptoms
  abnormalBleeding: [''],
  pelvicPain: [''],
  unusualDischarge: [''],
  painDuringIntercourse: [''],
  otherSymptoms: [''],
    });
  }


  get progressPercentage(): number {
    return (this.currentPage / this.totalPages) * 100;
  }

  get showSmokingDuration(): boolean {
    const smokingStatus = this.patientForm.get('smokingStatus')?.value;
    return smokingStatus === 'former' || smokingStatus === 'current';
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData: PatientData = this.patientForm.value;
      this.patientAdded.emit(patientData);
      console.log('Form submitted:', patientData);
    } else {
      console.log('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.patientForm.controls).forEach(key => {
      this.patientForm.get(key)?.markAsTouched();
    });
  }

  getPageClass(pageNum: number): string {
    if (this.currentPage === pageNum) {
      return 'bg-blue-100 text-blue-600';
    } else if (this.currentPage > pageNum) {
      return 'bg-green-100 text-green-600';
    } else {
      return 'bg-gray-100 text-gray-400';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.patientForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.patientForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['min']) {
        return `${fieldName} must be greater than ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${fieldName} must be less than ${field.errors['max'].max}`;
      }
    }
    return '';
  }
}  