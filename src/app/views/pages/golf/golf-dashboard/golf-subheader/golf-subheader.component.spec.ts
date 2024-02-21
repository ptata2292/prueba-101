import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { GolfSubheaderComponent } from './golf-subheader.component';
import { LoginService } from '../../../auth/login/login.service';
import { EncrDecrService } from '../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../shared/storage/session-storage';

describe('GolfSubheaderComponent', () => {
  let component: GolfSubheaderComponent;
  let fixture: ComponentFixture<GolfSubheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatAutocompleteModule ],
      declarations: [ GolfSubheaderComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolfSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
