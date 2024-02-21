import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSort, Sort} from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Hotel } from '../../hotel';
import { HotelOrderService } from '../../services/hotel-order.service';

@Component({
  selector: 'app-hotel-orders',
  templateUrl: './hotel-orders.component.html',
  styleUrls: ['./hotel-orders.component.css']
})
export class HotelOrdersComponent extends Hotel implements OnInit, AfterViewInit  {

  public searchOrderFG = new FormGroup({   
    FirstName: new FormControl('', Validators.required), 
    LastName: new FormControl('', Validators.required)
  });
  public searchOrderIdFG = new FormGroup({   
    OrderId: new FormControl('', Validators.required), 
  });
  public isSubmitted = false;
  public isLoading = false;
  public orders = [];
  public sortedOrders: MatTableDataSource<any>;

  displayedColumns: string[] = ['OrderId', 'PassengerName', 'Depature', 'Airport', 'Creation', 'Agency', 'AgencyId'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
    private hotelOrderService: HotelOrderService, private _snackBar: MatSnackBar) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  search() {
    this.isSubmitted = true;
    if(this.searchOrderFG.valid) {
      const value = this.searchOrderFG.value;
      this.searchOrderIdFG.reset();
      this.isLoading = true;
      this.hotelOrderService.getOrderByName(value.FirstName, value.LastName).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.isLoading = false;
        this.prepareOrders(data);
      });
    } else {
      this.searchOrderFG.markAllAsTouched();
    }
  }

  searchById() {
    this.isSubmitted = true;
    if(this.searchOrderIdFG.valid) {
      const value = this.searchOrderIdFG.value;
      this.searchOrderFG.reset();
      this.isLoading = true;
      this.hotelOrderService.getOrderById(value.OrderId).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.isLoading = false;
        let order = {
          flightSegment: [],
          passengerList: [],
          contactList: [],
          OrderId: data.response.order.orderID,
        };
        order = this.getOrderData(data, order);
        order = this.changeOrderData(order);
        this.orders = [];
        this.orders.push(order);
        this.sortedOrders = new MatTableDataSource(this.orders.slice());
        this.sortedOrders.sort = this.sort;
      });
    } else {
      this.searchOrderFG.markAllAsTouched();
    }
  }

  prepareOrders(data) {
    this.orders = [];
    if(data != null && data.response != null && data.response.orders != null && data.response.orders.order != null) {
      for(let orderObj of data.response.orders.order) {     
        let order = {
          OrderId : orderObj.orderID || orderObj.OrderID,
          PassengerName : ((orderObj.passengers||{}).fullName||{}).text || 'NA',
          Depature : ((orderObj.departure||{}).date||{}).text  || 'NA',
          Airport : ((orderObj.departure||{}).airportCode||{}).text || 'NA',
          Creation : orderObj.creationDate || 'NA',
          Agency : (orderObj.agency||{}).name || 'NA',
          AgencyId : ((orderObj.agency||{}).agencyID||{}).text  || 'NA'
        }
        this.orders.push(order);
      }
    }
    this.sortedOrders = new MatTableDataSource(this.orders.slice());
    this.sortedOrders.sort = this.sort;
  }
}
