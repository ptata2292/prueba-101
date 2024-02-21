import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpaViewService } from './spa-view.service';
import { Spa } from '../spa';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login/login.service';

const spaJson = {
  _id: '',
  objectCode: '',
  name: '',
  description: '',
  spaingType: '',
  deleteMark: 0,
  isActive: 1,
  changeCount: 0,
  acl : [],
  spaingCodes : [],
  objectLinks: []
};

@Component({
  selector: 'app-spa-view',
  templateUrl: './spa-view.component.html',
  styleUrls: ['./spa-view.component.css']
})
export class SpaViewComponent extends Spa implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private spaViewService: SpaViewService, private _snackBar: MatSnackBar, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
  }
}