import { AirlineSeatMap } from "../models/extra-service/airline-seat-map"
import { AirlinePassenger } from "../models/passenger/airline-passenger"
import { AirlineFlightRuleViewModel } from "./airline-flight-rule"

export type AirlineFlightSegmentViewModel = {
    layover?: any
    flightRules: Array<AirlineFlightRuleViewModel>
    departureAirportCode: string
    arrivalAirportCode: string
    airlineID: string
    flightNumber: string
    aircraftName: string
    departureDate: string
    departureTime: string
    departureAirportName: string
    departureTerminal: string
    arrivalDate: string
    arrivalTime: string 
    arrivalAirportName: string
    arrivalTerminal: string
    airlineName: string
    flightDuration: string
    segmentKey?: string
    seatMap?: AirlineSeatMap
    showSeatMap?: boolean
}
