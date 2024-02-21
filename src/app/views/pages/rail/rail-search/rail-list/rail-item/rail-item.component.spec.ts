import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RailItemComponent } from './rail-item.component';
import { LoginService } from '../../../../auth/login/login.service';
import { RailItem } from './rail-item';
import { EncrDecrService } from '../../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../../shared/storage/session-storage';

describe('RailItemComponent', () => {
  let component: RailItemComponent;
  let fixture: ComponentFixture<RailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ RailItemComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
