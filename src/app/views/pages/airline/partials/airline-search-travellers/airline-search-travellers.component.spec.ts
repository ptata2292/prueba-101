import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineSearchTravellersComponent } from './airline-search-travellers.component';

describe('AirlineSearchTravellersComponent', () => {
  let component: AirlineSearchTravellersComponent;
  let fixture: ComponentFixture<AirlineSearchTravellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineSearchTravellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSearchTravellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
