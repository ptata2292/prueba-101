import { AirlineSearchFlight } from "../models/flight/airline-search-flight";

export type TripType = 'one' | 'round' | 'multi';

export type AirlineSearch = {
    flights: Array<AirlineSearchFlight>, 
    tripType: TripType,
    travellers: Array<{
        index: number,
        ptc: string
    }>,
    loyaltyAccountNumber: string,
    isLoyaltyAccountEnabled: boolean
}