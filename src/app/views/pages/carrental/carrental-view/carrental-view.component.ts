import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrentalViewService } from './carrental-view.service';
import { Carrental } from '../carrental';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login/login.service';

const carrentalJson = {
  _id: '',
  objectCode: '',
  name: '',
  description: '',
  carrentalingType: '',
  deleteMark: 0,
  isActive: 1,
  changeCount: 0,
  acl : [],
  carrentalingCodes : [],
  objectLinks: []
};

@Component({
  selector: 'app-carrental-view',
  templateUrl: './carrental-view.component.html',
  styleUrls: ['./carrental-view.component.css']
})
export class CarrentalViewComponent extends Carrental implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private carrentalViewService: CarrentalViewService, private _snackBar: MatSnackBar, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
  }
}