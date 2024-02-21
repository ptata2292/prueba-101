import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineOrderRlocComponent } from './airline-order-rloc.component';

describe('AirlineOrderRlocComponent', () => {
  let component: AirlineOrderRlocComponent;
  let fixture: ComponentFixture<AirlineOrderRlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineOrderRlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineOrderRlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
