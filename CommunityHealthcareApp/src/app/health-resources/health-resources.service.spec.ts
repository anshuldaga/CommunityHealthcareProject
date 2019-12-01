import { TestBed } from '@angular/core/testing';

import { HealthResourcesService } from './health-resources.service';

describe('HealthResourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthResourcesService = TestBed.get(HealthResourcesService);
    expect(service).toBeTruthy();
  });
});
