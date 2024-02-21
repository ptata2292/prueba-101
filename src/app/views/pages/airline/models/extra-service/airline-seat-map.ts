import { AirlineSeat } from "./airline-seat"

export type AirlineSeatMap = {
    cabin: Array<{
        cabinLayout: {
            columns: Array<{
                value: string,      // A, B, C, D, E, F...
                position: string    // W (window?), C(center?), A(?), A, C, W
            }>,
            exitRowPosition: Array<{rowPosition: Array<{ first: {value: string}, last: {value: string}}>}>,
            rows: { first: number, last: number }
        },
        cabinType: {code: string},
        component: Array<{type: string, location: {rowPosition: {beforeOrAfter: "BEFORE" | "AFTER", begin: number, end: number, columnPosition: Array<string>}}}>,
        row: Array<{
            number?: { value: string },
            seat: Array<AirlineSeat>,
            notSeat?: boolean,
            isSeatNumberDisplay?: boolean
        }>
    }>,
    segmentRef: {
        value:{ 
            departure: {airportCode: {value: string}, time: {value: string}},
            arrival: {airportCode: {value: string}},
            classOfService: {code: {value: string}}, 
            marketingCarrier: {
                airlineID: string, //"AA",
                name: string, //"American Airlines",
                flightNumber: string //"2410"
            },
            equipment: {
                aircraftCode: string, //"738",
                name: string // "Boeing 737-800 Passenger"
            },
            segmentKey:  string, //"S4",
        }
    }
}