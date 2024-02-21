import { TestBed } from '@angular/core/testing';

import { AirlinePassengerService } from './airline-passenger.service';

describe('PassengerService', () => {
  let service: AirlinePassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlinePassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
