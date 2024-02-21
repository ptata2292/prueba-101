import { AirlineFareViewModel } from "./airline-fare-price"
import { AirlineFlightSegmentViewModel } from "./airline-flight-segment"
import { AirlineSelectedSeatViewModel } from "./airline-selected-seat"

export type AirlineOrderSummaryViewModel = {
    fare: AirlineFareViewModel,
    selectedSeats: Array<{
        segment: AirlineFlightSegmentViewModel,
        seat: AirlineSelectedSeatViewModel
    }>
}