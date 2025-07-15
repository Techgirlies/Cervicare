import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareRecommendationComponent } from './care-recommendation.component';

describe('CareRecommendationComponent', () => {
  let component: CareRecommendationComponent;
  let fixture: ComponentFixture<CareRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
