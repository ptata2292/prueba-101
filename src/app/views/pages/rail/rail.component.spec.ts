import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailComponent } from './rail.component';

describe('RailComponent', () => {
  let component: RailComponent;
  let fixture: ComponentFixture<RailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
