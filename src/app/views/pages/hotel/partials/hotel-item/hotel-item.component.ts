import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HotelRetrieveService } from '../../services/hotel-retrieve.service';
import { Router } from '@angular/router';
import { HotelItem } from './hotel-item';
import { LoginService } from 'src/app/views/pages/auth/login/login.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent extends HotelItem implements OnInit {

  constructor(public hotelRetrieveService:HotelRetrieveService ,router: Router,loginService: LoginService) {
    super(router, loginService);
  }

  ngOnInit() {
  }
}
