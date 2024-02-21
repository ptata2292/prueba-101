export type AirlineFlightSegment = {
    departure: {
        airportCode: {
            value: string
        },
        date: string,
        time: string,
        airportName: string,
        terminal: {
            name: string
        }
    },
    arrival: {
        airportCode: {
            value: string
        },
        date: string,
        time: string,
        airportName: string,
        terminal: {
            name: string
        }
    },
    marketingCarrier: {
        airlineID: {
            value: string
        },
        name: string,
        flightNumber: {
          value: string
        }
    },
    equipment: {
        aircraftCode: {
          value: string
        },
        name: string
    },
    classOfService: {
        code: {
          value: string
        }
    },
    flightDetail: {
        flightDuration: {
          value: string
        },
        stops: {
          stopQuantity: number
        },
        resDateTime: {
          date: {
            time: string
          }
        }
      }, 
      segmentKey: string,
      electronicTicketInd: boolean,
      secureFlight: boolean
}