import { TestBed } from '@angular/core/testing';

import { AirlinePaymentService } from './airline-payment.service';

describe('AirlinePaymentService', () => {
  let service: AirlinePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlinePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
