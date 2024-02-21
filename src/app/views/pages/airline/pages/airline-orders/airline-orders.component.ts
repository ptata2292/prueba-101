import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSort, Sort} from '@angular/material/sort';

import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { AirlineOrderService } from '../../services/airline-order.service';
import { MatTableDataSource } from '@angular/material/table';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { AirlineOrderByName as AirlineGetOrderByNameResponse } from '../../models/order/airline-order-by-name';
import { AirlineOrderStatus } from '../../models/order/airline-order-status';
import { AirlineOrderListItem } from '../../viewmodels/airline-order-list-item';
import { AirlineLoaderService } from '../../services/airline-loader.service';

@Component({
  selector: 'app-airline-orders',
  templateUrl: './airline-orders.component.html',
  styleUrls: ['./airline-orders.component.css']
})
export class AirlineOrdersComponent extends Airline implements OnInit, AfterViewInit  {

  public searchOrderFG = new FormGroup({   
    FirstName: new FormControl(''), 
    LastName: new FormControl('')
  });
  public searchOrderIdFG = new FormGroup({   
    OrderId: new FormControl('', Validators.required), 
  });
  public isSubmitted = false;
  public orders: Array<AirlineOrderListItem> = [];
  public sortedOrders: MatTableDataSource<AirlineOrderListItem>;

  displayedColumns: string[] = ['OrderId', 'PassengerName', 'Departure', 'Airport', 'CreationDate', 'AgencyName', 'AgencyId'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, loginService: LoginService,
    private retrieveService: AirlineRetrieveService,
    private airlineOrderService: AirlineOrderService,
    public airlineLoaderService: AirlineLoaderService) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.search();
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
      this.retrieveService.getOrderByName(value.FirstName, value.LastName).subscribe((data: AirlineGetOrderByNameResponse) => {
        this.orders = this.airlineOrderService.getOrderByNameViewModel(data);
        this.sortedOrders = new MatTableDataSource(this.orders.slice());
        this.sortedOrders.sort = this.sort;
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
      this.retrieveService.getOrderById(value.OrderId).subscribe((data: AirlineOrderStatus) => {
        // console.log('gerOrderByName');
        // console.log(data);
        let order: AirlineOrderListItem = this.airlineOrderService.getOrderByIdViewModel(data);
        this.orders = [order];
        this.sortedOrders = new MatTableDataSource(this.orders.slice());
        this.sortedOrders.sort = this.sort;
      });
    } else {
      this.searchOrderFG.markAllAsTouched();
    }
  }
}
