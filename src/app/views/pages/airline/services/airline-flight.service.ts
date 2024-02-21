import { Injectable } from '@angular/core';
import { AirlineFlightSegment } from '../models/flight/airline-flight-segment';
import { AirlineFareComponent } from '../models/price/airline-fare';
import { AirlineFlightViewModel } from '../viewmodels/airline-flight';
import { AirlineFlightRuleViewModel } from '../viewmodels/airline-flight-rule';
import { AirlineFlightSegmentViewModel } from '../viewmodels/airline-flight-segment';
import { AirlineDatetimeService } from './airline-datetime.service';
import { AirlineFareService } from './airline-fare.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineFlightService {

  constructor(private airlineDatetimeService: AirlineDatetimeService) { }
    
  createFlightViewModel(flightSegments: Array<AirlineFlightSegment>, fareComponent?: AirlineFareComponent): AirlineFlightViewModel {
    let segments = flightSegments.map((item) => this.createFlightSegment(item, fareComponent))
    let totalDays = this.airlineDatetimeService.getTotalDays(segments);
    let popUpMessage = "";
    let flightDuration = this.airlineDatetimeService.getTotalTravelTime(segments);
    let numberOfStops = flightSegments.length === 1 ? "Nonstop" : `${flightSegments.length-1} Stop(s)`;
    if (flightSegments.length > 1){
      let departureStops = [];
      let popUpMessageElement = [];
      for(let i = 1; i < segments.length; i++) {
          const flightSegment = segments[i];
          const pFlightSegment = segments[i-1];
          departureStops.push(flightSegment.departureAirportCode);
          flightSegment.layover = this.airlineDatetimeService.getTimeDiff(pFlightSegment, flightSegment);
          let message = pFlightSegment.departureAirportCode + " | " + this.airlineDatetimeService.getTimeDiff(pFlightSegment, flightSegment)  + " Layover " + pFlightSegment.arrivalAirportCode + " | " ;
          popUpMessageElement.push(message);
      }
      numberOfStops = numberOfStops + " via " + departureStops.join(", ");
      popUpMessage = popUpMessageElement.join(" ") + segments[segments.length-1].arrivalAirportCode + "\n"  + numberOfStops;
    }

    let vm: AirlineFlightViewModel = {
        departureAirportCode : flightSegments[0].departure.airportCode.value,
        arrivalAirportCode : flightSegments[flightSegments.length-1].arrival.airportCode.value,
        departureTime: flightSegments[0].departure.time,
        arrivalTime : flightSegments[flightSegments.length-1].arrival.time,
        numberOfStops : numberOfStops,
        departureAirportName: flightSegments[0].departure.airportName,
        arrivalAirportName : flightSegments[flightSegments.length-1].arrival.airportName,
        departureDate : flightSegments[0].departure.date,
        arrivalDate : flightSegments[flightSegments.length-1].arrival.date,
        flightDuration: flightDuration,
        flightSegments: segments,
        popUpMessage: popUpMessage,
        totalDays: totalDays,
    };
    return vm;
  }

  createFlightSegment(segment: AirlineFlightSegment, fareComponent?: AirlineFareComponent): AirlineFlightSegmentViewModel {
    let flightDuration = this.airlineDatetimeService.flightDuration(segment.flightDetail.flightDuration.value);
    let rules = fareComponent ? this.getPriceRules([fareComponent]) : null;
    let vm: AirlineFlightSegmentViewModel = {
      flightRules: rules,
      airlineID : segment.marketingCarrier.airlineID.value,
      flightNumber : segment.marketingCarrier.flightNumber.value, 
      aircraftName : segment.equipment.name.replace(/Passenger /g, '').replace(/ Passenger/g, ''),
      departureAirportCode : segment.departure.airportCode.value,
      arrivalAirportCode : segment.arrival.airportCode.value,
      departureDate : segment.departure.date,
      departureTime : segment.departure.time,
      departureAirportName : segment.departure.airportName,
      departureTerminal : segment.departure.terminal?.name,
      arrivalDate : segment.arrival.date,
      arrivalTime : segment.arrival.time,
      arrivalAirportName : segment.arrival.airportName,
      arrivalTerminal : segment.arrival.terminal?.name,
      airlineName : segment.marketingCarrier.name,
      segmentKey : segment.segmentKey,
      flightDuration : flightDuration.hours + "H " + flightDuration.minutes + "M",
    };
    return vm;
  }

  getPriceRules(fareComponents: AirlineFareComponent[] = []): AirlineFlightRuleViewModel[]{
    return fareComponents.map<AirlineFlightRuleViewModel>(({segmentRefs, fareRules, fareBasis}) => {
      let fareCode = fareBasis.fareBasisCode.refs[0].fare.fareCode;
      const instructions = fareRules.penalty.details.detail.filter(item => item.refs).map(({refs}) => {
        const [refInfo] = refs;
        const [instructionInfo] = refInfo.values.value;

        return {
          name: refInfo.ruleID.value,
          info: instructionInfo.instruction.value,
        };
      });

      let rule : AirlineFlightRuleViewModel = {
        segmentRefs: segmentRefs,
        fareCode: fareCode,
        allowCancel: instructions.find(i => i.name === "Cancel")?.info === "Allowed",
        allowChange: instructions.find(i => i.name === "Change")?.info === "Allowed",
        other: instructions.filter(i => i.name !== "Cancel" && i.name !== "Change")
      };
      return rule;
    });
  }
}
