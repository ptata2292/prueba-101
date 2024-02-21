import { AirlineFlightSegment } from "./airline-flight-segment"

export type AirlineFlight = {
    segmentReferences: {
        onPoint: string, //"DFW",
        offPoint: string, // "ORD",
        value: Array<AirlineFlightSegment>,
    },
    flightKey: string
}

export type AirlineFlightWithSegment = {
    flight: {
        journey:{
            time: string //PT03H35M
        }
        segmentReferences: {
            onPoint: string, //"DFW",
            offPoint: string, // "ORD",
            value: Array<AirlineFlightSegment>,
        },
        flightKey: string
    }, 
    flightSegments: Array<{FlightSegment: AirlineFlightSegment}>,
}