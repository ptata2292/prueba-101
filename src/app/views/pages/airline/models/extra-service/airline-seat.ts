import { AirlinePassenger } from "../passenger/airline-passenger"
import { AirlinePrice, AirlineTax, AirlineTotalPrice } from "../price/airline-price"

export type AirlineSeat = {
    column: string,
    rowNumber: number,
    seatStatus: string,
    seatCharacteristics: {
        code: Array<string>
    }, 
    offerItemRefs: Array<{
        offerItemID: string,
        eligibility: {
            passengerRefs: {
                value: Array<AirlinePassenger>
            }
        },
        service: {},
        unitPriceDetail: {
            totalAmount: AirlineTotalPrice
            baseAmount: AirlinePrice,
            taxes: {
                total: AirlinePrice,
                breakdown: {
                    tax: Array<AirlineTax>
                }
            }
        }
    }>,
}