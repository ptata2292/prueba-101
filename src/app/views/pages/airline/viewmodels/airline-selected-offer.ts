import { AirlineOfferWithDetails } from "../models/offer/airline-offer-details";
import { AirlineOfferItem } from "../models/offer/airline-offer-item";
import { AirlinePricedOffer } from "../models/offer/airline-priced-offer";
import { AirlineReshopOffer } from "../models/order/airline-reshop";
import { AirlinePassenger } from "../models/passenger/airline-passenger";
import { AirlineFlightViewModel } from "./airline-flight";

export interface AirlineSelectedOfferViewModel{
    offerID: string,
    originalOffer: AirlineOfferWithDetails | AirlineReshopOffer,
    flightList: Array<AirlineFlightViewModel>,
    pricedOffer?: AirlinePricedOffer
}
