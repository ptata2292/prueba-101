import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransportationItemComponent } from './transportation-item.component';
import { LoginService } from '../../../../auth/login/login.service';
import { TransportationItem } from './transportation-item';
import { EncrDecrService } from '../../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../../shared/storage/session-storage';

describe('TransportationItemComponent', () => {
  let component: TransportationItemComponent;
  let fixture: ComponentFixture<TransportationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ TransportationItemComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
