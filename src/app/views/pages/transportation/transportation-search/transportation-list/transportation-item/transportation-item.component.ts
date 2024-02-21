import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TransportationRetrieveService } from '../../../transportation-dashboard/transportation-retrieve.service';
import { Router } from '@angular/router';
import { TransportationItem } from './transportation-item';
import { LoginService } from '../../../../auth/login/login.service';

@Component({
  selector: 'app-transportation-item',
  templateUrl: './transportation-item.component.html',
  styleUrls: ['./transportation-item.component.css']
})
export class TransportationItemComponent extends TransportationItem implements OnInit {

  constructor(public transportationRetrieveService:TransportationRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
