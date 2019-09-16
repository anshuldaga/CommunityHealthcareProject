import { TestBed } from '@angular/core/testing';

import { HealthCalendarService } from './health-calendar.service';

describe('HealthCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthCalendarService = TestBed.get(HealthCalendarService);
    expect(service).toBeTruthy();
  });
});
