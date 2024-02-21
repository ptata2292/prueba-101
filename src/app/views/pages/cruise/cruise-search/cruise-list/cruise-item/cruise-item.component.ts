import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CruiseRetrieveService } from '../../../cruise-dashboard/cruise-retrieve.service';
import { Router } from '@angular/router';
import { CruiseItem } from './cruise-item';
import { LoginService } from '../../../../auth/login/login.service';

@Component({
  selector: 'app-cruise-item',
  templateUrl: './cruise-item.component.html',
  styleUrls: ['./cruise-item.component.css']
})
export class CruiseItemComponent extends CruiseItem implements OnInit {

  constructor(public cruiseRetrieveService:CruiseRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
