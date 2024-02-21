import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RailRetrieveService } from '../../../rail-dashboard/rail-retrieve.service';
import { Router } from '@angular/router';
import { RailItem } from './rail-item';
import { LoginService } from '../../../../auth/login/login.service';

@Component({
  selector: 'app-rail-item',
  templateUrl: './rail-item.component.html',
  styleUrls: ['./rail-item.component.css']
})
export class RailItemComponent extends RailItem implements OnInit {

  constructor(public railRetrieveService:RailRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
