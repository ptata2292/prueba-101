import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinePassengerListComponent } from './airline-passenger-list.component';

describe('AirlinePassengerListComponent', () => {
  let component: AirlinePassengerListComponent;
  let fixture: ComponentFixture<AirlinePassengerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinePassengerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinePassengerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
