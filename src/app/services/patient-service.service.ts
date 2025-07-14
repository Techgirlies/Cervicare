import { Injectable } from '@angular/core';
import { PatientData } from '../models/patientInfo';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: PatientData[] = [];

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample patient data for testing
    this.patients = [
      { patientId: 'CC001',
        fullName: 'Sarah Johnson',
        dateOfBirth: '1985-03-15',
        age: 39,
        gender: 'female',
        phoneNumber: '+1-555-0123',
        email: 'sarah.johnson@email.com',
        address: '123 Main St, Anytown, ST 12345',
        emergencyContact: 'John Johnson',
        emergencyPhone: '+1-555-0124',
        familyHistory: ['Breast Cancer', 'Cervical Cancer'],
        currentMedications: 'Metformin 500mg, Lisinopril 10mg',
        allergies: 'Penicillin, Shellfish',
        lastPapSmear: '2023-06-15',
        papSmearResults: 'normal',
        lastHPVTest: '2023-06-15',
        hpvResults: 'negative',
        previousCervicalProcedures: ['Colposcopy'],
        abnormalBleeding: '',
        pelvicPain: '',
        painDuringIntercourse: '',
        unusualDischarge: '',
        smokingStatus: 'former',
        alcoholConsumption: 'moderate',
        numberOfPregnancies: 2,
        ageAtFirstPregnancy: 25,
        contraceptiveUse: 'oral',
        contraceptiveDuration: 10,
        exerciseFrequency: 'regular',
        dietType: 'balanced',
        stressLevel: 'moderate',
        stage: '',
        grade: '',
        treatmentPlan: 'Regular screening every 3 years',
        followUpDate: '2026-06-15',
        notes: 'Patient is compliant with screening schedule',
    }
    ];
  }

  async getAllPatients(): Promise<PatientData[]> {
    try {
      return Promise.resolve([...this.patients]); // Return a copy to prevent external mutations
    } catch (error) {
      console.error('Error fetching patients:', error);
      return Promise.resolve([]);
    }
  }

  async getPatientById(patientId: string): Promise<PatientData | null> {
    try {
      if (!patientId) {
        return Promise.resolve(null);
      }
      const patient = this.patients.find(p => p.patientId === patientId);
      return Promise.resolve(patient ? { ...patient } : null); // Return a copy
    } catch (error) {
      console.error('Error fetching patient:', error);
      return Promise.resolve(null);
    }
  }

  async addPatient(patient: PatientData): Promise<PatientData> {
    try {
      // Generate ID if not provided
      if (!patient.patientId) {
        patient.patientId = this.generatePatientId();
      }
      
      const newPatient = { ...patient };
      this.patients.push(newPatient);
      return Promise.resolve(newPatient);
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  }

  async updatePatient(patientId: string, updates: Partial<PatientData>): Promise<PatientData | null> {
    try {
      const index = this.patients.findIndex(p => p.patientId === patientId);
      if (index !== -1) {
        this.patients[index] = { ...this.patients[index], ...updates };
        return Promise.resolve({ ...this.patients[index] });
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error('Error updating patient:', error);
      return Promise.resolve(null);
    }
  }

  async deletePatient(patientId: string): Promise<boolean> {
    try {
      const index = this.patients.findIndex(p => p.patientId === patientId);
      if (index !== -1) {
        this.patients.splice(index, 1);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
      return Promise.resolve(false);
    }
  }

  private generatePatientId(): string {
    const prefix = 'CC';
    const nextNumber = this.patients.length + 1;
    return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
  }
}