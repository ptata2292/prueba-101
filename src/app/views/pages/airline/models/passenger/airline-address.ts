export type AirlineAddress = {
    cityName: string,
    countryCode: {value: string},
    postalCode: string,
    stateProv: string,
    street: Array<string>,
}