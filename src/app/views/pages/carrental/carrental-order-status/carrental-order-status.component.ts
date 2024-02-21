import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../auth/login/login.service';
import { Carrental } from '../carrental';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { CarrentalOrderService } from '../carrental-order.service';

@Component({
  selector: 'app-carrental-order-status',
  templateUrl: './carrental-order-status.component.html',
  styleUrls: ['./carrental-order-status.component.css']
})
export class CarrentalOrderStatusComponent extends Carrental implements OnInit {

  public isSubmitted = false;
  public isLoading = false;
  public order = {
    flightSegment: [],
    passengerList: [],
    contactList: []
  };
  public orderId;
  public flightSegmentList = [];

  displayedColumns: string[] = ['Index', 'Name', 'Gender', 'DOB'];

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
    private carrentalOrderService: CarrentalOrderService, private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
      //this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if(this.orderId != null){
      this.carrentalOrderService.gerOrderById(this.orderId).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.isLoading = false;      
        this.order = this.getOrderData(data, this.order);
      });
    }
  }  
}
