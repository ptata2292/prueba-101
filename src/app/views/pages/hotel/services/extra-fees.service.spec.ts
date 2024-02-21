import { TestBed } from '@angular/core/testing';

import { ExtraFeesService } from './extra-fees.service';

describe('ExtraFeesService', () => {
  let service: ExtraFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
