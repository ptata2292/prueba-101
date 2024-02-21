import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineSearchHeaderComponent } from './airline-search-header.component';

describe('AirlineSearchHeaderComponent', () => {
  let component: AirlineSearchHeaderComponent;
  let fixture: ComponentFixture<AirlineSearchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineSearchHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
