import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFlightFareInfoComponent } from './airline-flight-fare-info.component';

describe('AirlineFlightFareInfoComponent', () => {
  let component: AirlineFlightFareInfoComponent;
  let fixture: ComponentFixture<AirlineFlightFareInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineFlightFareInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFlightFareInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
