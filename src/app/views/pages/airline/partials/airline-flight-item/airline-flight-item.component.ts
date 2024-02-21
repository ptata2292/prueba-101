import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { collapseAnimation } from 'src/app/animations';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineSeatAvailabilityResponse } from '../../models/extra-service/airline-seat-availability-response';
import { AirlineFlightViewModel } from '../../viewmodels/airline-flight';
import { AirlineFlightSegmentViewModel } from '../../viewmodels/airline-flight-segment';
import { AirlineSeatAvailabilityService } from '../../services/airline-seat-availability.service';
import { AirlinePassengerSummaryViewModel } from '../../viewmodels/airline-passenger';
import { AirlinePassenger } from '../../models/passenger/airline-passenger';
import { AirlinePassengerService } from '../../services/airline-passenger.service';
import { AirlineSelectedSeatViewModel } from '../../viewmodels/airline-selected-seat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AirlineOrderViewModel } from '../../viewmodels/airline-order';
import { Router } from '@angular/router';
import { AirlineLoaderService } from '../../services/airline-loader.service';
import { AirlineChangeOrderService } from '../../services/airline-change-order.service';

@Component({
  selector: 'app-airline-flight-item',
  templateUrl: './airline-flight-item.component.html',
  styleUrls: ['./airline-flight-item.component.css'],
  animations: [
    collapseAnimation
  ]
})
export class AirlineFlightItemComponent extends Airline implements OnChanges {

@Input() flights: Array<AirlineFlightViewModel>;
@Input() passengers: Array<AirlinePassengerSummaryViewModel>;
@Input() orderId: string;
@Input() orderViewModel: AirlineOrderViewModel;

seatMapLoading : boolean;

  constructor(
    loginService: LoginService,
    private router: Router,
    private airlineSeatAvailabilityService: AirlineSeatAvailabilityService,
    private airlineChangeOrderService: AirlineChangeOrderService,
    public airlineLoaderService: AirlineLoaderService) {
    super(loginService);
  }

  ngOnChanges(): void {
    if(this.orderViewModel){
      this.flights = this.orderViewModel.flights;
    }

    if(this.orderViewModel){
      this.passengers = this.orderViewModel.passengers;
    }

  }
  
  seatChanged(anyChanges){
    if(anyChanges){
      this.airlineChangeOrderService.addChange("SeatAvailability", this.orderId)
    }
    else {
      this.airlineChangeOrderService.clearSeatAvailabilityChanges(this.orderId);
    }
  }

  getPassengerLabel(passenger: AirlinePassenger){
    return this.passengers.find(i => i.data.passengerID == passenger.passengerID).label;
  }

  getSelectedSeats(segment: AirlineFlightSegmentViewModel){
    let selectedSeats: Array<AirlineSelectedSeatViewModel> = [];
    this.passengers.forEach(i => {
      let selectedSeat = i.orderSummary.selectedSeats.find(s => s.segment.segmentKey == segment.segmentKey);
      if(selectedSeat){
        selectedSeats.push(selectedSeat.seat);
      }
    });
    return selectedSeats;
  }

  showHideSelectSeats(flightSegment : AirlineFlightSegmentViewModel){
    this.orderViewModel.editMode = true;
    if (this.orderViewModel.seatMapLoaded) {
      flightSegment.showSeatMap = !flightSegment.showSeatMap;
      return;
    }

    if(!this.seatMapLoading){
      this.seatMapLoading = true;
      this.airlineSeatAvailabilityService.loadSeats(this.orderId, flightSegment.airlineID).subscribe((data: AirlineSeatAvailabilityResponse) => {
        this.seatMapLoading = false;
        this.orderViewModel.seatMapLoaded = true;
        
        this.orderViewModel.seatSelectionRQ = {
          offerID : data.alaCarteOffer.offerID,
          owner: data.alaCarteOffer.owner,
          responseID: data.shoppingResponseID.responseID.value,
        };
        this.airlineSeatAvailabilityService.updateFlightsWithSeats(this.flights, data);
        
        flightSegment.showSeatMap = true;
      });
    }
  }
}
