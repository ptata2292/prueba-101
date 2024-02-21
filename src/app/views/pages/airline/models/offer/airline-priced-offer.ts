import { AirlinePassenger } from "../passenger/airline-passenger"
import { AirlineTotalPrice } from "../price/airline-price"
import { AirlineOfferItem } from "./airline-offer-item"

export type AirlinePricedOfferResponse = {
    errors?: any,
    shoppingResponseID: {
        responseID: {
            value: string
        }
    },
    pricedOffer: AirlinePricedOffer,
    dataLists: {
        passengerList: {
            passenger: Array<AirlinePassenger>
        }
    }
}

export type AirlinePricedOffer = {
    flightsOverview: any,
    parameters: any,
    timeLimits: any,
    totalPrice: AirlineTotalPrice,
    match: any,
    offerItem: Array<AirlineOfferItem>,
    baggageAllowance: any,
    offerID: string,
    owner: string
}
