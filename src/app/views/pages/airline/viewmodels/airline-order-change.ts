export type AirlineOrderChangeViewModel = {
    type: AirlineOrderChangeType,
    label: string,
    orderID: string,
}

export type AirlineOrderChangeType = "SeatAvailability" | "ChangePassengerInfo" | "ChangeFlight";