import { AirlineOfferWithDetails } from "../models/offer/airline-offer-details"
import { AirlineFlightViewModel } from "./airline-flight"
import { AirlineFlightFareViewModel } from "./airline-flight-fare"

export type AirlineGrouppedFlightsViewModel = {
    showPrices?: boolean,
    key: string,
    flightList: Array<AirlineFlightViewModel>,
    flightFares: Array<AirlineFlightFareViewModel>,
}