export type AirlineBookingReference = {
    id: string,
    otherID?: {
        value: string
    },
    airlineID? :{
        name: string,
        value: string
    }
}