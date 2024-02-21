import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinePaymentFormComponent } from './airline-payment-form.component';

describe('AirlinePaymentFormComponent', () => {
  let component: AirlinePaymentFormComponent;
  let fixture: ComponentFixture<AirlinePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinePaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
