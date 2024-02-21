import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineSeatAvailabilityComponent } from './airline-seat-availability.component';

describe('AirlineSeatAvailabilityComponent', () => {
  let component: AirlineSeatAvailabilityComponent;
  let fixture: ComponentFixture<AirlineSeatAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineSeatAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSeatAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
