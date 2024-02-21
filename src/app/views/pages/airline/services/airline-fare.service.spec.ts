import { TestBed } from '@angular/core/testing';

import { AirlineFareService } from './airline-fare.service';

describe('AirlineFareService', () => {
  let service: AirlineFareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineFareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
