import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineOrderChangesComponent } from './airline-order-changes.component';

describe('AirlineOrderChangesComponent', () => {
  let component: AirlineOrderChangesComponent;
  let fixture: ComponentFixture<AirlineOrderChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineOrderChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineOrderChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
