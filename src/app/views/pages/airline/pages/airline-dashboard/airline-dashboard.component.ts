import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinct, filter, map, switchMap } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ErrorStateMatcher } from '@angular/material/core';
import { of } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

import { environment } from '../../../../../../environments/environment';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { Airline } from '../../airline';
import { LoginService } from '../../../auth/login/login.service';
import { MyErrorStateMatcher } from '../../../../../shared/models/airline.model';
import { AirlineSearchHeaderComponent } from '../../partials/airline-search-header/airline-search-header.component';

@Component({
  selector: 'app-airline-dashboard',
  templateUrl: './airline-dashboard.component.html',
  styleUrls: ['./airline-dashboard.component.css']
})
export class AirlineDashboardComponent extends Airline implements OnInit, AfterViewInit {
  @ViewChild(AirlineSearchHeaderComponent) airlineSearchHeader: AirlineSearchHeaderComponent;
  
  constructor(loginService: LoginService, private airlineRetrieveService: AirlineRetrieveService, 
    private renderer: Renderer2, private store: Store, private router: Router) {    
    super(loginService);  
  }
 
  ngAfterViewInit(): void {
  }
  
  ngOnInit() {
    // this.getAllAirportSearchService();
  }

  btnSearchClick(){
    this.airlineSearchHeader.validateAndSearch();
  }
  
  search(){
    this.router.navigateByUrl('/Airlines/Search');
  }
}
