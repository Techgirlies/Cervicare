import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-care-recommendation',
  imports: [],
  templateUrl: './care-recommendation.component.html',
  styleUrl: './care-recommendation.component.css'
})
export class CareRecommendationComponent {
   @Input() patient: any = null;

}
