import { TestBed } from '@angular/core/testing';

import { AirlineLoaderService } from './airline-loader.service';

describe('AirlineLoaderService', () => {
  let service: AirlineLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
