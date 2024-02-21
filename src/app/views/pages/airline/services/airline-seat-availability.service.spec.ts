import { TestBed } from '@angular/core/testing';

import { AirlineSeatAvailabilityService } from './airline-seat-availability.service';

describe('AirlineSeatAvailabilityService', () => {
  let service: AirlineSeatAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineSeatAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
