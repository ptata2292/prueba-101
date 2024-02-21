import { AirlineFareDetail } from "../price/airline-fare";
import { AirlineTotalPrice } from "../price/airline-price";
import { AirlineServiceItem } from "./airline-order-service-item";

export type AirlineOrderItem = {
    bookingReferences: any;
    priceDetail: {
        totalAmount: AirlineTotalPrice,
    },
    service: Array<AirlineServiceItem>,
    timeLimits: any,
    fareDetail: Array<AirlineFareDetail>,
    orderItemID: string
}
