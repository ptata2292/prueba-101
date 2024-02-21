import { TestBed } from '@angular/core/testing';

import { AirlineFlightService } from './airline-flight.service';

describe('AirlineFlightService', () => {
  let service: AirlineFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
