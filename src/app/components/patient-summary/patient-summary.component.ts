import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-summary',
  imports: [],
  templateUrl: './patient-summary.component.html',
  styleUrl: './patient-summary.component.css'
})
export class PatientSummaryComponent implements OnInit {
  @Input() patient: any = null;

  constructor() { }

  ngOnInit(): void {
    console.log('Patient Summary loaded for:', this.patient);
  }

}
