import { AirlineFlight } from "../flight/airline-flight"
import { AirlineFlightSegment } from "../flight/airline-flight-segment"
import { AirlineOfferItem } from "../offer/airline-offer-item"
import { AirlineFareDetail } from "../price/airline-fare"
import { AirlinePrice, AirlineTax, AirlineTotalPrice } from "../price/airline-price"
import { AirlineServiceItem } from "./airline-order-service-item"

export type AirlineReshopResponse = {
    response: {
        dataLists: any
        reShoppingResponseID: {
            responseID: {
                value: string
            }
        },
        reshopOffers: {
            reshopOffer: Array<AirlineReshopOffer>
        }
    }
}

export type AirlineReshopOffer = {
    parameters: any,
    baggageAllowance: any
    validatingCarrier: string,
    timeLimits: any,
    totalPrice: AirlineTotalPrice,
    offerID: string,
    owner: string,
    flightsOverview: {
        flightRef: Array<{
            value: AirlineFlight,
            odref: {
                departureCode: {
                    value: string
                },
                arrivalCode: {
                    value: string
                },
                flightReferences: {
                    value: Array<{
                        segmentReferences: {
                            onPoint: string, //"DFW",
                            offPoint: string, // "ORD",
                            value: Array<AirlineFlightSegment>,
                            flightKey: string
                        },
                    }>,
                    onPoint: string, //"DFW",
                    offPoint: string, // "ORD",
                }
            }
        }>
    },
    addOfferItem: Array<AirlineOfferItem>
}