import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineOrderSummaryComponent } from './airline-order-summary.component';

describe('AirlineOrderSummaryComponent', () => {
  let component: AirlineOrderSummaryComponent;
  let fixture: ComponentFixture<AirlineOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineOrderSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
