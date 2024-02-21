import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CruiseItemComponent } from './cruise-item.component';
import { LoginService } from '../../../../auth/login/login.service';
import { CruiseItem } from './cruise-item';
import { EncrDecrService } from '../../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../../shared/storage/session-storage';

describe('CruiseItemComponent', () => {
  let component: CruiseItemComponent;
  let fixture: ComponentFixture<CruiseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ CruiseItemComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruiseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
