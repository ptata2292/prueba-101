import { AirlineSeatMap } from "./airline-seat-map"

export type AirlineSeatAvailabilityResponse = {
    errors?:Array<any>,
    seatMap: Array<AirlineSeatMap>,
    alaCarteOffer: {
        offerID: string,
        owner: string
    },
    shoppingResponseID: {
        responseID: {
            value: string
        }
    },
    dataLists: {
        passengerList: {
            passenger: Array<any>
        },
        contactList: any
    }
}