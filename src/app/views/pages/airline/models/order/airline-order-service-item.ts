import { AirlinePassenger } from "../passenger/airline-passenger"

export type AirlineServiceItem = {
    serviceID: string,
    passengerRef: AirlinePassenger,
    selectedSeat?: {
        seat:{
            row: number,
            column: string
        },
        segmentRef:string
    }
}