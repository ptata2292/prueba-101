import { TestBed } from '@angular/core/testing';

import { AirlineErrorService } from './airline-error.service';

describe('AirlineErrorService', () => {
  let service: AirlineErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
