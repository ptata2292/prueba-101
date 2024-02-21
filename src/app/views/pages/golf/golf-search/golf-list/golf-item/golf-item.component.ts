import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GolfRetrieveService } from '../../../golf-dashboard/golf-retrieve.service';
import { Router } from '@angular/router';
import { GolfItem } from './golf-item';
import { LoginService } from '../../../../auth/login/login.service';

@Component({
  selector: 'app-golf-item',
  templateUrl: './golf-item.component.html',
  styleUrls: ['./golf-item.component.css']
})
export class GolfItemComponent extends GolfItem implements OnInit {

  constructor(public golfRetrieveService:GolfRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
