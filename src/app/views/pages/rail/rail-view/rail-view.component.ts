import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RailViewService } from './rail-view.service';
import { Rail } from '../rail';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login/login.service';

const railJson = {
  _id: '',
  objectCode: '',
  name: '',
  description: '',
  railingType: '',
  deleteMark: 0,
  isActive: 1,
  changeCount: 0,
  acl : [],
  railingCodes : [],
  objectLinks: []
};

@Component({
  selector: 'app-rail-view',
  templateUrl: './rail-view.component.html',
  styleUrls: ['./rail-view.component.css']
})
export class RailViewComponent extends Rail implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private railViewService: RailViewService, private _snackBar: MatSnackBar, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit() {
  }
}