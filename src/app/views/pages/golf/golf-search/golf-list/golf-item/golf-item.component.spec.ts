import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GolfItemComponent } from './golf-item.component';
import { LoginService } from '../../../../auth/login/login.service';
import { GolfItem } from './golf-item';
import { EncrDecrService } from '../../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../../shared/storage/session-storage';

describe('GolfItemComponent', () => {
  let component: GolfItemComponent;
  let fixture: ComponentFixture<GolfItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ GolfItemComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolfItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
