import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SpaRetrieveService } from '../../../spa-dashboard/spa-retrieve.service';
import { Router } from '@angular/router';
import { SpaItem } from './spa-item';
import { LoginService } from '../../../../auth/login/login.service';

@Component({
  selector: 'app-spa-item',
  templateUrl: './spa-item.component.html',
  styleUrls: ['./spa-item.component.css']
})
export class SpaItemComponent extends SpaItem implements OnInit {

  constructor(public spaRetrieveService:SpaRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
