import { AirlineOfferWithDetails } from '../models/offer/airline-offer-details';
import { AirlineReshopOffer } from '../models/order/airline-reshop';
import {AirlineFlightRuleViewModel} from './airline-flight-rule';

export type AirlineFlightFareViewModel = {
    totalPrice: number;
    cabinType: 'Economy' | 'First Class',
    flightRules: Array<AirlineFlightRuleViewModel>,
    offerID: string,
    originalOffer: AirlineOfferWithDetails | AirlineReshopOffer,
    reshopPrices?:{
        original: number,
        newItem: number,
        reshopDue: number;
    }
};
