// src/app/models/patientInfo.ts
export interface PatientData {
  // Basic Information
  patientId?: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;

  // Medical History
  familyHistory: string[];
  currentMedications?: string;
  allergies?: string;

  // Cervical Cancer Screening
  lastPapSmear?: string;
  papSmearResults?: string;
  lastHPVTest?: string;
  hpvResults?: string;
  previousCervicalProcedures?: string[];

  // Symptoms
  abnormalBleeding?: string;
  pelvicPain?: string;
  painDuringIntercourse?: string;
  unusualDischarge?: string;

  // Lifestyle Factors
  smokingStatus?: string;
  alcoholConsumption?: string;
  numberOfPregnancies?: number;
  ageAtFirstPregnancy?: number;
  contraceptiveUse?: string;
  contraceptiveDuration?: number;
  exerciseFrequency?: string;
  dietType?: string;
  stressLevel?: string;

  // Diagnosis and Treatment
  stage?: string;
  grade?: string;
  treatmentPlan?: string;
  followUpDate?: string;
  notes?: string;
}

export interface PageInfo {
  num: number;
  title: string;
  icon: string;
}