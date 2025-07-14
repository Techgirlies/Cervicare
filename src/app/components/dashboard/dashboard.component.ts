import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CostBreakdown } from '../../models/cost-breakdown.interface';
import { PatientData } from '../../models/patientInfo';
import { ScheduleItem } from '../../models/schedule-item.interface';
import { RecommendedAction } from '../../models/recommended-action.interface';
import { PatientService } from '../../services/patient-service.service';
import { FinancialSummaryComponent } from "../financial-summary/financial-summary.component";
import { CareRecommendationComponent } from "../care-recommendation/care-recommendation.component";
import { RiskAssessmentComponent } from "../risk-assessment/risk-assessment.component";
import { PatientFormComponent } from "../patient-form/patient-form.component";
import { PatientSummaryComponent } from "../patient-summary/patient-summary.component";
import { InventoryComponent } from '../inventory/inventory.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FinancialSummaryComponent,
    InventoryComponent,
    CareRecommendationComponent,
    RiskAssessmentComponent,
    PatientFormComponent,
    PatientSummaryComponent,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab = 'inventory';
  patients: PatientData[] = [];
  selectedPatientId = '';
  selectedPatient: PatientData | null = null;
  searchTerm = '';

  

  patientForm: FormGroup;

  @Output() patientAdded = new EventEmitter<PatientData>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  
  ngOnInit() {
    this.loadPatients();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  async loadPatients() {
    try {
      this.patients = await this.patientService.getAllPatients();
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  }

  onPatientSelect() {
    if (this.selectedPatientId) {
      this.selectedPatient = this.patients.find(
        p => p.patientId === this.selectedPatientId
      ) || null;
    } else {
      this.selectedPatient = null;
    }
  }

  searchPatients() {
    if (this.searchTerm.trim()) {
      this.patients = this.patients.filter(patient =>
        patient.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        // patient.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.patientId?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadPatients();
    }
  }

  onPatientAdded(newPatient: PatientData) {
    this.patients.push(newPatient);
    this.selectedPatientId = newPatient.patientId || '';
    this.selectedPatient = newPatient;
    this.activeTab = 'patient-summary';
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const newPatient: PatientData = {
        patientId: 'P' + Date.now(), // simple unique ID
        ...this.patientForm.value
      };
      this.patientAdded.emit(newPatient);
      this.patientForm.reset();
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

  refreshPatientData() {
    this.loadPatients();
    if (this.selectedPatientId) {
      this.onPatientSelect();
    }
  }

  exportPatientData() {
    if (this.selectedPatient) {
      const dataStr = JSON.stringify(this.selectedPatient, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      const exportFileDefaultName = `patient_${this.selectedPatient.patientId}_${new Date().toISOString().split('T')[0]}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  }
}
