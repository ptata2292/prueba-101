export type AirlineOrderByName = {
    response: {
        orders:{
            order: Array<{
                creationDate: string,
                agency: {
                    agencyID: {value: string}
                    iatanumber: string,
                    name: string
                },
                departure: {
                    airportCode: {value: string},
                    date: string
                },
                nbrInParty: {value: number},
                orderID: string,
                passengers: { fullName: Array<{value: string}>},
                status: { statusCode: string }
            }>
        }
    }
};