import { Injectable } from '@angular/core';
import { AirlineSeatAvailabilityResponse } from '../models/extra-service/airline-seat-availability-response';
import { AirlineSeatMap } from '../models/extra-service/airline-seat-map';
import { AirlineFlightViewModel } from '../viewmodels/airline-flight';
import { AirlineFlightSegmentViewModel } from '../viewmodels/airline-flight-segment';
import { AirlineOrderViewModel } from '../viewmodels/airline-order';
import { AirlinePassengerSummaryViewModel } from '../viewmodels/airline-passenger';
import { AirlinePassengerService } from './airline-passenger.service';
import { AirlineRetrieveService } from './airline-retrieve.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineSeatAvailabilityService {
  
  constructor(private airlineRetrieveService: AirlineRetrieveService, 
    private passengerService: AirlinePassengerService ) { }

  loadSeats(orderID: string, owner: string) {
    let query = {
      query: {
          order: {
              orderID: orderID,
              owner: owner,
          }
      }
    }; 

    return this.airlineRetrieveService.getSeatAvailability(query);
  }

  bookSelectedSeats(orderID: string, orderViewModel: AirlineOrderViewModel) {
    let passengers: Array<AirlinePassengerSummaryViewModel> = orderViewModel.passengers;
    let passengerList = orderViewModel.passengerList;
    passengerList.passenger.forEach(p => this.passengerService.updatePassengerBeforeSending(p));

    let offerItems = [];
    passengers.forEach(p => {
      let selectedSeats = p.orderSummary.selectedSeats.filter(s => s.seat.offerItemID);
      if (selectedSeats.length) {
        selectedSeats.forEach(selectedSeat => {
          offerItems.push({
            passengerRefs: [p.data.passengerID],
            offerItemID: selectedSeat.seat.offerItemID,
            seatSelection: {
              row: selectedSeat.seat.row,
              column: selectedSeat.seat.column
            } 
          });  
        })
      }
    });

    let request = {
      query: {
        orderServicing: {
          acceptOffer:{
            offer: [{
              offerID: orderViewModel.seatSelectionRQ.offerID,
              responseID: orderViewModel.seatSelectionRQ.responseID,
              owner: orderViewModel.seatSelectionRQ.owner,
              offerItem: offerItems
            }]
          }
        },
        orderID: orderID
      },
      dataLists: {
        passengerList: passengerList,
        contactList: orderViewModel.contactList
      },
    };

    return this.airlineRetrieveService.orderChange(request, "Booking seats...", true);
  }
  
  updateFlightsWithSeats(flights: Array<AirlineFlightViewModel>, data: AirlineSeatAvailabilityResponse) {
    flights.forEach(flight => {
      flight.flightSegments.forEach(segment => {
        let seatMaps = data.seatMap.filter(i => i.segmentRef.value.segmentKey == segment.segmentKey);
        if(seatMaps && seatMaps.length){
          segment.seatMap = this.initSeatMaps(seatMaps);
        }
      });
    });
  }

  initSeatMaps(seatMaps: Array<AirlineSeatMap>): AirlineSeatMap {
    let result = seatMaps[0];
    seatMaps.forEach(map => {
      if (map != result){
        map.cabin.forEach(c => result.cabin.push(c));
      }
    });
    
    for(let cabin of result.cabin) {
      let components = cabin.component;
      let columns = cabin.cabinLayout.columns;
      this.setWidth(columns, cabin);

      for(let i =0; i < cabin.row.length; i++) {
        let row = cabin.row[i];
        let rowNumber = row.number != null ? row.number.value : '';

        for(let j =0; j <  row.seat.length; j++) {
          let seat = row.seat[j];
          if(rowNumber != ''){
            seat.rowNumber = Number(rowNumber);
          }
        }
      }
      
      for(let component of components) {
        let type = component.type;
        let beforeOrAfter = component.location.rowPosition.beforeOrAfter;
        let begin = component.location.rowPosition.begin;
        // let end = component.location.rowPosition.end;
        let columnPosition = component.location.rowPosition.columnPosition;
        if(["BK"].includes(type)){
          continue;
        }
        if( beforeOrAfter != null) {
            let emptyRow = this.getEmptyRow(columns, type, columnPosition);
            let index = cabin.row.findIndex(i => i.number && Number(i.number.value) == begin);
            if(beforeOrAfter == 'AFTER') {
              index += 1;
            } 
            if(index === cabin.row.length || ((index === 0 || (index > 0 && index < cabin.row.length && !cabin.row[index-1].notSeat)) && !cabin.row[index].notSeat)) {
                cabin.row.splice(index, 0, emptyRow);
            }
          }
      }

      for(let i =0; i < cabin.row.length; i++) {
        let row = cabin.row[i];
        if(!row.notSeat) {
          let seatNumberRow = this.getSeatNumberRow(columns)
          cabin.row.splice(i, 0, seatNumberRow);
          break;
        }
      }
    }
    /*let obj = {} as any;
    for(let segment of this.segmentArr) {
      console.log(segment.segmentKey);
      for(let seats of segment.seats) {
        for(let cabin of seats.cabin) {
          let exitRowPositions = cabin.cabinLayout.exitRowPosition;
          let rowsLayout = cabin.cabinLayout.rows;
          let components = cabin.component;
          // console.log(exitRowPositions);
          for(let row of cabin.row) {
            // console.log(row.number.value);
			      let columns = [];
            for(let seat of row.seat) {
              columns.push(seat.column);
              // console.log(seat.column);
              // console.log(seat.seatCharacteristics.code.join(","));
              obj[seat.column] = obj[seat.column] || [];
              let code = seat.seatCharacteristics.code;
              let codes = [];
              for(let c of code) {
                if(c != 'LS' && c!= 'RS') {
                  codes.push(this.seatCharacteristics[c]);
                }
              }
              // if(this.isExitRowPositions(exitRowPositions, row.number.value)) {
              //   codes.push('Exit');
              // }
              obj[seat.column].push(codes.join(","));
              if(row.number.value == rowsLayout.last) {
                obj[seat.column].push('');
              }
            }
			      // console.log(columns.join(","));
          }
        }
      }
      break;
    }
    console.log(obj);*/

    return result;
  }

  getSeatNumberRow(columns) {
    let row = {
      "seat": [],
      isSeatNumberDisplay: true
    };
    row.seat = JSON.parse(JSON.stringify(columns));
    for(let seat of row.seat) {
      seat.isSeatNumberDisplay = true;
    }
    return row;
  }

  getEmptyRow(columns, type, columnPosition: any[]) {
    let row = {
      "seat": [],
      notSeat: true
    };
    row.seat = JSON.parse(JSON.stringify(columns));
    let i = 0;
    for(let seat of row.seat) {
      if(columnPosition.includes(seat.value)) {
        seat.type = type;
      }
      if(type == 'D' && ( i==0 || i == (row.seat.length -1))) {
        if(i==0) {
          seat.icon = 'exitL.svg';
        } else {
          seat.icon = 'exitR.svg';
        }
      } else {
        seat.notSeat = true;
      }
      i++;
    }
    return row;
  }

  setWidth(columns: any, cabin: any) {
    let aisleCount = 0;
    let spacesCount = 0;
    let index = 0;
    let aisleIndexes = [];
    for(let row of columns) {
      if(row.position == "A") {
        aisleCount++;
      } else {
        aisleCount = 0;
      }
      if(aisleCount == 2) {
        spacesCount++;
        aisleIndexes.push(index);
      }
      index++;
    }
    let width = 100/(columns.length+spacesCount+2);
    cabin.width = width;
    cabin.aisleIndexes = aisleIndexes;
    // console.log('setWidth', columns.length+spacesCount+2, width);
  }
}

