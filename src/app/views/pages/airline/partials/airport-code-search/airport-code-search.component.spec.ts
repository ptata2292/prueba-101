import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportCodeSearchComponent } from './airport-code-search.component';

describe('AirportCodeSearchComponent', () => {
  let component: AirportCodeSearchComponent;
  let fixture: ComponentFixture<AirportCodeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportCodeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportCodeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
