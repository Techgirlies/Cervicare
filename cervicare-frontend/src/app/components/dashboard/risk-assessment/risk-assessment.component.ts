import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskPredictionService } from '../../../services/risk-prediction.service';

@Component({
  selector: 'app-risk-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [RiskPredictionService],
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.css']
})
export class RiskAssessmentComponent {
  formData: any = {};
  loading = false;
  prediction = '';

  constructor(private riskService: RiskPredictionService) {}

  fields = [
    { key: 'Age', label: 'Age', type: 'number' },
    { key: 'Sexual Partners', label: 'Sexual Partners', type: 'number' },
    { key: 'First Sexual Activity Age', label: 'First Sexual Activity Age', type: 'number' },
    { key: 'HPV Test Result', label: 'HPV Test Result', type: 'select', options: ['Positive', 'Negative'] },
    { key: 'Pap Smear Result', label: 'Pap Smear Result', type: 'select', options: ['Positive', 'Negative'] },
    { key: 'Smoking Status', label: 'Smoking Status', type: 'select', options: ['Smoker', 'Non-Smoker'] },
    { key: 'STDs History', label: 'STDs History', type: 'select', options: ['Yes', 'No'] },
    { key: 'Region', label: 'Region', type: 'text' },
    { key: 'Insurance Covered', label: 'Insurance Covered', type: 'select', options: ['Yes', 'No'] },
    { key: 'Screening Type Last', label: 'Screening Type Last', type: 'text' }
  ];

  onSubmit() {
    this.loading = true;
    this.prediction = '';
    const formattedInput = [{
      'Age': this.formData['Age'],
      'Sexual_Partners': this.formData['Sexual Partners'],
      'First_Sexual_Activity_Age': this.formData['First Sexual Activity Age'],
      'HPV_Test_Result': this.formData['HPV Test Result'],
      'Pap_Smear_Result': this.formData['Pap Smear Result'],
      'Smoking_Status': this.formData['Smoking Status'],
      'STDs_History': this.formData['STDs History'],
      'Region': this.formData['Region'],
      'Insurance_Covered': this.formData['Insurance Covered'],
      'Screening_Type_Last': this.formData['Screening Type Last']
    }];

    this.riskService.predictRisk(formattedInput).subscribe({
      next: (res: any) => {
        this.prediction = `Predicted Risk: ${res.risk_percentage}%`;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.prediction = 'Prediction failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
