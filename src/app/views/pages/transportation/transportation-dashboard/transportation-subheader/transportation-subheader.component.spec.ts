import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TransportationSubheaderComponent } from './transportation-subheader.component';
import { LoginService } from '../../../auth/login/login.service';
import { EncrDecrService } from '../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../shared/storage/session-storage';

describe('TransportationSubheaderComponent', () => {
  let component: TransportationSubheaderComponent;
  let fixture: ComponentFixture<TransportationSubheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatAutocompleteModule ],
      declarations: [ TransportationSubheaderComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
