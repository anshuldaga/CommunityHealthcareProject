import { TestBed } from '@angular/core/testing';

import { HealthEducationService } from './health-education.service';

describe('HealthEducationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthEducationService = TestBed.get(HealthEducationService);
    expect(service).toBeTruthy();
  });
});
