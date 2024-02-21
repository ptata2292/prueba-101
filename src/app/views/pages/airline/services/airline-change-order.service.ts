import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { ArrayHelperService } from 'src/app/shared/services/array-helper.service';
import { AirlineOrderViewModel } from '../viewmodels/airline-order';
import { AirlineOrderChangeType, AirlineOrderChangeViewModel } from '../viewmodels/airline-order-change';
import { AirlineErrorService } from './airline-error.service';
import { AirlineLoaderService } from './airline-loader.service';
import { AirlineOrderService } from './airline-order.service';
import { AirlinePassengerService } from './airline-passenger.service';
import { AirlineSeatAvailabilityService } from './airline-seat-availability.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineChangeOrderService {

  private changes: Array<AirlineOrderChangeViewModel> = [];

  constructor(
    private airlineOrderService: AirlineOrderService,
    private seatAvailabilityService: AirlineSeatAvailabilityService,
    private passengerService: AirlinePassengerService,
    private errorService: AirlineErrorService,
    private arrayHelperService: ArrayHelperService) { 
  }

  addChange(type: AirlineOrderChangeType, orderID: string){
    let label = "";
    switch(type){
      case 'ChangeFlight': {
        label = "Flights changed";
        this.clearSeatAvailabilityChanges(orderID);
        this.clearChangeFlightChanges(orderID);
        break;
      }
      case 'ChangePassengerInfo':{
        label = "Passenger information changed";
        this.clearPassengerChanges(orderID);
        break;
      }
      case 'SeatAvailability': {
        label = "Seats changed";
        this.clearSeatAvailabilityChanges(orderID);
        break;
      }
    }
      
    this.changes.push({ type : type, orderID: orderID, label: label });
  }  

  acceptChanges(orderID: string, orderViewModel: AirlineOrderViewModel) {
    let orderChanges = this.changes.filter(i => i.orderID == orderID);
    if (orderChanges.length){
      this.errorService.hideErrors();
      this.arrayHelperService.sortBy(orderChanges, [i => ["ChangeFlight", "SeatAvailability", "ChangePassengerInfo"].indexOf(i.type)]);
      let observable = from(orderChanges).pipe(
        concatMap(change => this.getChangeAction(change, orderID, orderViewModel))
        // switchMap(data => this.catchFailResponse(data, url, query, skipHideLoader)),
        // catchError(e => this.handleError(e))
      );
      return observable;
    }
  } 
  
  getChangeAction(change: AirlineOrderChangeViewModel, orderID: string, orderViewModel: AirlineOrderViewModel): any {
    switch(change.type){
      case "ChangeFlight":{
        return this.airlineOrderService.acceptReshop(orderID, orderViewModel);
      }
      case "SeatAvailability": {
        return this.seatAvailabilityService.bookSelectedSeats(orderID, orderViewModel);
      }
      case "ChangePassengerInfo":{
        return this.passengerService.diffAndSaveChanges(orderID, orderViewModel);
      }
    }
  }

  clearChanges(orderID: string, orderViewModel: AirlineOrderViewModel){
    this.changes = this.arrayHelperService.removeMatching(this.changes, i => i.orderID == orderID);
    orderViewModel.changedOrder = null;
    orderViewModel.changedPassengerList = null;
    orderViewModel.passengers.forEach(i => i.orderSummary.selectedSeats = this.arrayHelperService.removeMatching(i.orderSummary.selectedSeats, s => s.seat.offerItemID != null));
  }

  clearChangeFlightChanges(orderID: string) {
    this.changes = this.arrayHelperService.removeMatching(this.changes, i => i.orderID == orderID && i.type === "ChangeFlight");
  }

  clearSeatAvailabilityChanges(orderID: string) {
    this.changes = this.arrayHelperService.removeMatching(this.changes, i => {
      return i.orderID == orderID && i.type === "SeatAvailability"
    });
  }

  clearPassengerChanges(orderID: string) {
    this.changes = this.arrayHelperService.removeMatching(this.changes, i => i.orderID == orderID && i.type === "ChangePassengerInfo");
  }

  anyChanges(orderID: string): boolean{
    return this.changes.filter(i => i.orderID == orderID).length > 0;
  }

  viewOrderChanges(orderID: string){
    return this.changes.filter(i => i.orderID == orderID);
  }
}

