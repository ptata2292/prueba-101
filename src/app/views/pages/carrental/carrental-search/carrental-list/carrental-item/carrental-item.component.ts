import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CarrentalRetrieveService } from '../../../carrental-dashboard/carrental-retrieve.service';
import { Router } from '@angular/router';
import { CarrentalItem } from './carrental-item';
import { LoginService } from '../../../../auth/login/login.service';

@Component({
  selector: 'app-carrental-item',
  templateUrl: './carrental-item.component.html',
  styleUrls: ['./carrental-item.component.css']
})
export class CarrentalItemComponent extends CarrentalItem implements OnInit {

  constructor(public carrentalRetrieveService:CarrentalRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
