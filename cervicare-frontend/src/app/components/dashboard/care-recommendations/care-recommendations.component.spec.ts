import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareRecommendationsComponent } from './care-recommendations.component';

describe('CareRecommendationsComponent', () => {
  let component: CareRecommendationsComponent;
  let fixture: ComponentFixture<CareRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
