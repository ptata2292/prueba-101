import { TestBed } from '@angular/core/testing';

import { AirlineOfferService } from './airline-offer.service';

describe('AirlineOfferService', () => {
  let service: AirlineOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
