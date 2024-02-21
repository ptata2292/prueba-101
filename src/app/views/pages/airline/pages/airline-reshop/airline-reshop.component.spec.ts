import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineReshopComponent } from './airline-reshop.component';

describe('AirlineReshopComponent', () => {
  let component: AirlineReshopComponent;
  let fixture: ComponentFixture<AirlineReshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineReshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineReshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
