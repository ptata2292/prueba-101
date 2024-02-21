import { AirlineAddress } from "../passenger/airline-address"
import { AirlinePrice } from "../price/airline-price"

export type AirlinePayment = {
    amount: {
        simpleCurrencyPrice: AirlinePrice,
    },
    orderItemID: Array<string>,
    type: "CC", // todo: add others here
    status: { statusCode: string},
    method: {
        paymentCardMethod:{
            cardCode: string,
            cardHolderName: {value: string },
            cardHolderAddress: {
                structuredAddress: AirlineAddress
            },
            effectiveExpireDate: string,
            maskedCardNumber: { value: string}
        }
    }
}