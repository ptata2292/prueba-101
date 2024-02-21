import { AirlineFlightWithSegment } from "../models/flight/airline-flight"
import { AirlineFlightSegment } from "../models/flight/airline-flight-segment"
import { AirlineFareComponent } from "../models/price/airline-fare"
import { AirlineFlightSegmentViewModel } from "./airline-flight-segment"

export class AirlineFlightViewModel{
    flightKey?: string
    departureAirportCode: string
    arrivalAirportCode: string
    departureTime: string 
    departureDate: string
    arrivalTime: string
    arrivalDate: string
    flightDuration: string
    numberOfStops: string
    flightSegments: AirlineFlightSegmentViewModel[]
    departureAirportName: string
    arrivalAirportName: string
    totalDays: number;
    popUpMessage: string;
    stopShow?: boolean
    isPopUp?: boolean;

    constructor(){

    }
}
