import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportationViewService } from './transportation-view.service';
import { Transportation } from '../transportation';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login/login.service';

const transportationJson = {
  _id: '',
  objectCode: '',
  name: '',
  description: '',
  transportationingType: '',
  deleteMark: 0,
  isActive: 1,
  changeCount: 0,
  acl : [],
  transportationingCodes : [],
  objectLinks: []
};

@Component({
  selector: 'app-transportation-view',
  templateUrl: './transportation-view.component.html',
  styleUrls: ['./transportation-view.component.css']
})
export class TransportationViewComponent extends Transportation implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private transportationViewService: TransportationViewService, private _snackBar: MatSnackBar, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
  }
}