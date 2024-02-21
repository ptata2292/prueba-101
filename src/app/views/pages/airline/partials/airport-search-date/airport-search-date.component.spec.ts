import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportSearchDateComponent } from './airport-search-date.component';

describe('AirportSearchDateComponent', () => {
  let component: AirportSearchDateComponent;
  let fixture: ComponentFixture<AirportSearchDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportSearchDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportSearchDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
