import { TestBed } from '@angular/core/testing';

import { RiskPredictionService } from './risk-prediction.service';

describe('RiskPredictionService', () => {
  let service: RiskPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
