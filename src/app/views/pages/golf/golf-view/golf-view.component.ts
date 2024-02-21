import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GolfViewService } from './golf-view.service';
import { Golf } from '../golf';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login/login.service';

const golfJson = {
  _id: '',
  objectCode: '',
  name: '',
  description: '',
  golfingType: '',
  deleteMark: 0,
  isActive: 1,
  changeCount: 0,
  acl : [],
  golfingCodes : [],
  objectLinks: []
};

@Component({
  selector: 'app-golf-view',
  templateUrl: './golf-view.component.html',
  styleUrls: ['./golf-view.component.css']
})
export class GolfViewComponent extends Golf implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private golfViewService: GolfViewService, private _snackBar: MatSnackBar, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
  }
}