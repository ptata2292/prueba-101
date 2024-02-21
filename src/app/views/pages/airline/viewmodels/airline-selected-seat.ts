import { AirlinePassenger } from "../models/passenger/airline-passenger"
import { AirlinePriceViewModel } from "./airline-price"

export type AirlineSelectedSeatViewModel = {
    row: number,
    column: string,
    passenger: AirlinePassenger,
    offerItemID?: string,
    orderItemID?: string,
    price: AirlinePriceViewModel
}