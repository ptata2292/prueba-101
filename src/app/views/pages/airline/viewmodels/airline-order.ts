import {AirlineBookingReference} from '../models/order/airline-booking-reference';
import {AirlineFlightViewModel} from './airline-flight';
import {AirlinePassengerSummaryViewModel} from './airline-passenger';
import {AirlineFlightRuleViewModel} from './airline-flight-rule';
import { AirlinePaymentViewModel } from './airline-payment';
import { AirlinePassenger } from '../models/passenger/airline-passenger';
import { AirlineOrderItem } from '../models/order/airline-order-item';
import { AirlineReshopOffer } from '../models/order/airline-reshop';
import { AirlineOfferViewModel } from './airline-offer';

export type AirlineOrderViewModel = {
    orderID: string;
    editMode?: boolean;
    bookingReferences: Array<AirlineBookingReference>;
    flights: Array<AirlineFlightViewModel>;
    flightFaresInfo: AirlineFlightRuleViewModel[];
    passengers: Array<AirlinePassengerSummaryViewModel>;
    payments: Array<AirlinePaymentViewModel>;
    seatMapLoaded?: boolean,
    contactList: any,
    passengerList: {
        passenger: Array<AirlinePassenger>
    },
    seatSelectionRQ?: {
        responseID: string,
        owner: string,
        offerID: string,
    },
    originalOrderItems: Array<AirlineOrderItem>,
    changedOrder?: AirlineOfferViewModel,
    changedPassengerList?:{
        passenger: Array<AirlinePassenger>
    }
}
