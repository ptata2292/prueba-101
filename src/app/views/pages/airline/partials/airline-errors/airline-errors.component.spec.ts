import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineErrorsComponent } from './airline-errors.component';

describe('AirlineErrorsComponent', () => {
  let component: AirlineErrorsComponent;
  let fixture: ComponentFixture<AirlineErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
