import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineContactFormComponent } from './airline-contact-form.component';

describe('AirlineContactFormComponent', () => {
  let component: AirlineContactFormComponent;
  let fixture: ComponentFixture<AirlineContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
