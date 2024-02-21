import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineLoaderComponent } from './airline-loader.component';

describe('AirlineLoaderComponent', () => {
  let component: AirlineLoaderComponent;
  let fixture: ComponentFixture<AirlineLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
