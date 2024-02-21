import { AirlinePassenger } from "../models/passenger/airline-passenger"
import { AirlineOrderSummaryViewModel } from "./airline-order-summary"

export type AirlinePassengerSummaryViewModel = {
    label: string,
    ticketNo?: string, 
    data: AirlinePassenger,
    orderSummary: AirlineOrderSummaryViewModel,
    showDetails?: boolean
} 