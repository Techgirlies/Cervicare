import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-risk-assessment',
  imports: [],
  templateUrl: './risk-assessment.component.html',
  styleUrl: './risk-assessment.component.css'
})
export class RiskAssessmentComponent {
   @Input() patient: any = null;

}
