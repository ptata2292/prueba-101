import { TestBed } from '@angular/core/testing';

import { AirlineChangeOrderService } from './airline-change-order.service';

describe('AirlineChangeOrderService', () => {
  let service: AirlineChangeOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineChangeOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
