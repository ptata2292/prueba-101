import { TestBed } from '@angular/core/testing';

import { AirlineDatetimeService } from './airline-datetime.service';

describe('AirlineDatetimeService', () => {
  let service: AirlineDatetimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineDatetimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
