import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CruiseViewService } from './cruise-view.service';
import { Cruise } from '../cruise';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login/login.service';

const cruiseJson = {
  _id: '',
  objectCode: '',
  name: '',
  description: '',
  cruiseingType: '',
  deleteMark: 0,
  isActive: 1,
  changeCount: 0,
  acl : [],
  cruiseingCodes : [],
  objectLinks: []
};

@Component({
  selector: 'app-cruise-view',
  templateUrl: './cruise-view.component.html',
  styleUrls: ['./cruise-view.component.css']
})
export class CruiseViewComponent extends Cruise implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private cruiseViewService: CruiseViewService, private _snackBar: MatSnackBar, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
  }
}