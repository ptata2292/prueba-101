import { AirlineOfferItem } from "../models/offer/airline-offer-item";
import { AirlinePricedOffer } from "../models/offer/airline-priced-offer";
import { AirlineReshopOffer } from "../models/order/airline-reshop";
import { AirlineFlightViewModel } from "./airline-flight";
import { AirlinePassengerSummaryViewModel } from "./airline-passenger";

export type AirlineOfferViewModel = {
    responseID: string,
    offerID: string,
    owner: string,
    offerItems: Array<AirlineOfferItem>,
    flights: Array<AirlineFlightViewModel>,
    passengers: Array<AirlinePassengerSummaryViewModel>,
    dataLists: any
}
