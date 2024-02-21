import { AirlineAirport } from "./airline-airport";

export type AirlineSearchFlight = {
    from: AirlineAirport,
    to: AirlineAirport,
    departureDate: Date,
}