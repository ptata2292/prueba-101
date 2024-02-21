import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFlightItemComponent } from './airline-flight-item.component';

describe('AirlineFlightItemComponent', () => {
  let component: AirlineFlightItemComponent;
  let fixture: ComponentFixture<AirlineFlightItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineFlightItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFlightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
