import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinePassengerFormComponent } from './airline-passenger-form.component';

describe('AirlinePassengerFormComponent', () => {
  let component: AirlinePassengerFormComponent;
  let fixture: ComponentFixture<AirlinePassengerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinePassengerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinePassengerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
