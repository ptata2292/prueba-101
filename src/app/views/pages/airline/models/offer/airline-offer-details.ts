import { AirlineFlightWithSegment } from "../flight/airline-flight"
import { AirlineTotalPrice } from "../price/airline-price"
import { AirlineOfferItem } from "./airline-offer-item"

export type AirlineOfferWithDetails = {
    flightsOverview: any,
    flightsPlusSegments: Array<AirlineFlightWithSegment>
    parameters: any,
    timeLimits: any,
    totalPrice: AirlineTotalPrice,
    match: any,
    offerItem: Array<AirlineOfferItem>,
    baggageAllowance: any,
    offerID: string,
    owner: string
}