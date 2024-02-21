import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinePaymentSummaryComponent } from './airline-payment-summary.component';

describe('AirlinePaymentsComponent', () => {
  let component: AirlinePaymentSummaryComponent;
  let fixture: ComponentFixture<AirlinePaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinePaymentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinePaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
