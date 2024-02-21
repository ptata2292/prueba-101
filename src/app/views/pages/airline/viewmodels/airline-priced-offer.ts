import { AirlinePricedOffer } from "../models/offer/airline-priced-offer";
import { AirlineSearch } from "./airline-search";
import { AirlineSelectedOfferViewModel } from "./airline-selected-offer"

export type AirlinePricedOfferViewModel = {
    pricedOffer: AirlinePricedOffer,
    responseID: string,
    airlineSearch: AirlineSearch
}