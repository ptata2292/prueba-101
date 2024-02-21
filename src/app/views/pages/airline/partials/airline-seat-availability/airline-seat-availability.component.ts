import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineFlightSegmentViewModel } from '../../viewmodels/airline-flight-segment';
import { AirlineSeat } from '../../models/extra-service/airline-seat';
import { AirlinePassengerSummaryViewModel } from '../../viewmodels/airline-passenger';
import { AirlineSelectedSeatViewModel } from '../../viewmodels/airline-selected-seat';
import { AirlineChangeOrderService } from '../../services/airline-change-order.service';
 
@Component({
  selector: 'app-airline-seat-availability',
  templateUrl: './airline-seat-availability.component.html',
  styleUrls: ['./airline-seat-availability.component.css']
})
export class AirlineSeatAvailabilityComponent extends Airline implements OnInit {

  public isSubmitted = false;

  @Input() flightSegment: AirlineFlightSegmentViewModel;
  @Input() passengers: Array<AirlinePassengerSummaryViewModel>;
  @Output() seatChanged = new EventEmitter();

  public seatCharacteristics = {
    '1':'Restricted Seat- General',
    '2':'Leg rest available',
    '3':'Individual video screen - Choice of movies',
    '4':'Not a window seat',
    '5':'Not an aisle seat',
    '6':'Near galley seat',
    '7':'Near toilet seat',
    '8':'No seat at this location',
    '9':'Center seat (not window, not aisle)',
    '10':'Seat designated for RBD "A"',
    '11':'Seat designated for RBD "B"',
    '12':'Seat designated for RBD "C"',
    '13':'Seat designated for RBD "D"',
    '14':'Seat designated for RBD "F"',
    '15':'Seat designated for RBD "H"',
    '16':'Seat designated for RBD "J"',
    '17':'Seat designated for RBD "K"',
    '18':'Seat designated for RBD "L"',
    '19':'Seat designated for RBD "M"',
    '20':'Seat designated for RBD "P"',
    '21':'Seat designated for RBD "Q"',
    '22':'Seat designated for RBD "R"',
    '23':'Seat designated for RBD "S"',
    '24':'Seat designated for RBD "T"',
    '25':'Seat designated for RBD "V"',
    '26':'Seat designated for RBD "W"',
    '27':'Seat designated for RBD "Y"',
    'A':'Aisle seat',
    'AA':'All available aisle seats',
    'AB':'Seat adjacent to bar',
    'AC':'Seat adjacent to closet',
    'AG':'Seat adjacent to galley',
    'AJ':'Adjacent aisle seats',
    'AL':'Seat adjacent to lavatory',
    'AM':'Individual movie screen - No choice of movie selection',
    'AR':'No seat - airphone',
    'AS':'Individual airphone',
    'AT':'Seat adjacent to table',
    'AU':'Seat adjacent to stairs to upper deck',
    'AV':'Only available seats',
    'AW':'All available window seats',
    'B':'Seat with bassinet facility',
    'BA':'No seat - bar',
    'BK':'Blocked Seat for preferred passenger in adjacent seat',
    'C':'Crew seat',
    'CC':'Center section seat(s)',
    'CL':'No seat - closet',
    'CS':'Conditional seat - contact airline',
    'D':'No seat - exit door',
    'DE':'Deportee',
    'E':'Exit row seat',
    'EA':'S Not an exit seat',
    'EC':'Electronic connection for lap top or FAX machine',
    'EX':'No seat - emergency Exit',
    'F':'Added seat',
    'FC':'Front of cabin class/compartment',
    'G':'Seat at forward end of cabin',
    'GF':'General facility',
    'GN':'No seat - galley',
    'GR':'Group seat - offered to travellers belonging to a group',
    'H':'Seat with facilities for handicapped/incapacitated passenger',
    'I':'Seat suitable for adult with an infant',
    'IA':'Inside aisle seats',
    'IE':'Seat not suitable for child',
    'J':'Rear facing seat',
    'K':'Bulkhead seat',
    'KA':'Bulkhead seat with movie screen',
    'KN':'Bulkhead, no seat',
    'L':'Leg space seat',
    'LA':'No seat - lavatory',
    'LG':'No seat - luggage storage',
    'LH':'Restricted seat - offered on long-haul segments',
    'LS':'Left side of aircraft',
    'M':'Seat without a movie view',
    'MA':'Medically OK to travel',
    'N':'No smoking seat',
    'O':'Preferential seat',
    'OW':'Over wing seat(s)',
    'P':'Priority Seat',
    'PC':'Pet cabin',
    'PP':'Power Port',
    'Q':'Seat in a quiet zone',
    'RS':'Right side of aircraft',
    'S':'Smoking seat',
    'SO':'No seat - storage space',
    'ST':'No seat - stairs to upper deck',
    'T':'Rear/Tail section of aircraft',
    'TA':'No seat - table',
    'U':'Seat suitable for unaccompanied minors',
    'UP':'Upper deck',
    'V':'Seat to be left vacant or offered last',
    'W':'Window seat',
    'WA':'Window and aisle together',
    'X':'No facility seat (indifferent seat)',
    'Z':'Buffer zone seat',
    '1A':'Seat not allowed for infant',
    '1B':'Seat not allowed for medical',
    '1C':'Seat not allowed for unaccompanied minor',
    '1D':'Restricted recline seat',
    '1M':'Seat with movie view',
    '1W':'Window seat without window',
    '3A':'Individual video screen - No choice of movie',
    '3B':'Individual video screen - Choice of movies, games, information, etc.',
    '6A':'In front of galley seat',
    '6B':'Behind galley seat',
    '7A':'In front of toilet seat',
    '7B':'Behind toilet seat',
    '700':'Individual video screen - services unspecified',
    '701':'No seat - access to handicapped lavatory',
  };

  // AirAvailabilityRS/OriginDestination/Flight/Segment/Classes/ClassOfService/@Status
  // TimeTableRS/TimeTable/OriginDestination/Flight/Segment/Classes/ClassOfService/@Status
  public seatStatus = {
    'A':'Seats are available',
    'L':'Waitlist open for the segment and class',
    'C':'Waitlist closed',
    'R':'Seats on request only to airline',
    'S':'Waitlist closed',
    '0':'number of at least available seats',
    '1':'number of at least available seats',
    '2':'number of at least available seats',
    '3':'number of at least available seats',
    '4':'number of at least available seats',
    '5':'number of at least available seats',
    '6':'number of at least available seats',
    '7':'number of at least available seats',
    '8':'number of at least available seats',
    '9':'number of at least available seats'
  }
  public cabinTypes = {
    'F': 'First Class',
    'J': 'Premium Business Class',
    'C': 'Business Class',
    'W': 'Premium Economy Class',
    'Y': 'Coach (Economy) Class'
  }

  constructor(loginService: LoginService, private airlineChangeOrderService: AirlineChangeOrderService) {
    super(loginService);
  }

  ngOnInit(): void {
    
  }

  rowspanSeat(seat) {
    return seat.rowspan == null ? 1 : seat.rowspan;
  }

  colspanSeat(seat) {
    return seat.colspan == null ? 1 : seat.colspan;
  }
  isSeat(seat) {
    return !seat.notSeat && !seat.hidden
              && !seat.isSeatNumberDisplay && !seat.icon;
  }

  getSeatClass(seat) {
    if(this.isSeatSelected(seat)) {
      return "bg-success border-1 border-light border-solid";
    }
    if(this.isSeatAvailable(seat)) {
      return "bg-light-white border-1 border-secondary border-solid";
    }
    return "bg-complete border-1 border-light border-solid";
  }

  isSeatSelected(seat: AirlineSeat) : AirlinePassengerSummaryViewModel{
    return this.passengers.find(p => p.orderSummary.selectedSeats.find(s => s.seat.column == seat.column && s.seat.row == seat.rowNumber && s.segment.segmentKey == this.flightSegment.segmentKey));
  }

  seatClick(seat: AirlineSeat) {
    let passengerOnSeat = this.isSeatSelected(seat);
    if(!passengerOnSeat && this.isSeatAvailable(seat)) {
      let passenger = this.getNextPassengerForSeatSelection();
      if(!passenger){
        return;
      }

      let currentPassengerSeat = passenger.orderSummary.selectedSeats.find(s => s.segment.segmentKey == this.flightSegment.segmentKey);
      if (currentPassengerSeat){
        passenger.orderSummary.selectedSeats.splice(passenger.orderSummary.selectedSeats.indexOf(currentPassengerSeat), 1);
      }

      let offerItem = seat.offerItemRefs.find(i => i.eligibility.passengerRefs.value.find(p => p.passengerID == passenger.data.passengerID));
      let selectedSeat: AirlineSelectedSeatViewModel = {
        column: seat.column,
        row: seat.rowNumber,
        passenger: passenger.data,
        offerItemID: offerItem.offerItemID,
        price: {
          currency: offerItem.unitPriceDetail.totalAmount.detailCurrencyPrice.total.code,
          value: offerItem.unitPriceDetail.totalAmount.detailCurrencyPrice.total.value * 0.01
        } 
      };
      passenger.orderSummary.selectedSeats.push({ segment: this.flightSegment, seat: selectedSeat });
    }
    else if(passengerOnSeat){
      let selectedSeat = passengerOnSeat.orderSummary.selectedSeats.find(s => s.seat.column == seat.column && s.seat.row == seat.rowNumber && s.segment.segmentKey == this.flightSegment.segmentKey);
      if (selectedSeat.seat.offerItemID){
        passengerOnSeat.orderSummary.selectedSeats.splice(passengerOnSeat.orderSummary.selectedSeats.indexOf(selectedSeat), 1);
      }
    }
    
    let anyChanges = this.passengers.find(p => p.orderSummary.selectedSeats.find(s => s.seat.offerItemID));
    this.seatChanged.emit(anyChanges);
  }

  getNextPassengerForSeatSelection() : AirlinePassengerSummaryViewModel{
    let passenger = this.passengers.find(p => !p.orderSummary.selectedSeats.find(s => s.segment.segmentKey == this.flightSegment.segmentKey));
    if(!passenger){
      passenger = this.passengers.find(p => p.orderSummary.selectedSeats.find(s => s.segment.segmentKey == this.flightSegment.segmentKey && s.seat.offerItemID));
    }
    return passenger; 
  }

  getSeatPrice(seat: AirlineSeat){
    let nextPassenger = this.getNextPassengerForSeatSelection();
    let offer = nextPassenger ?
       seat.offerItemRefs.find(i => i.eligibility.passengerRefs.value.find(p => p.passengerID == nextPassenger.data.passengerID)):
       seat.offerItemRefs[0];

    let price = offer.unitPriceDetail.totalAmount.detailCurrencyPrice.total.value * 0.01;
    return price;
  }

  isSeatAvailable(seat: AirlineSeat) {
    if(seat.seatStatus == 'A') {
      return true;
    }
    return false;
  }

  getTooltipText(seat) {
    if(seat.seatCharacteristics != null && seat.seatCharacteristics.code != null){
      // return seat.seatCharacteristics.code;
      if(!this.isSeatAvailable(seat)) {
        return "Seat is not available";
      }
      let codes = [];
      for(let c of seat.seatCharacteristics.code) {
        if(c != 'LS' && c!= 'RS' && codes.indexOf(this.seatCharacteristics[c]) < 0) {
          codes.push(this.seatCharacteristics[c]);
        }
      }
      return codes.join(', ');
    }
    return '';
  }

  isExitRowPositions(exitRowPositions, num) {
   if(exitRowPositions!= null) {
    for(let exitRowPosition of exitRowPositions) {
      let first = Number(exitRowPosition.rowPosition[0].first.value);
      let last = Number(exitRowPosition.rowPosition[0].last.value);
      if( first <= num && last >= num) {
        return true;
      }
     }
   }
   return false;
  }
}
