import { AirlineFlightWithSegment } from "../flight/airline-flight";
import { AirlineServiceItem } from "../order/airline-order-service-item";
import { AirlineFareComponent as AirlineFareComponent, AirlineFareDetail } from "../price/airline-fare";
import { AirlinePrice, AirlineTax, AirlineTotalPrice } from "../price/airline-price";

export type AirlineOfferItem = {
    totalPriceDetail: {
        totalAmount: AirlineTotalPrice,
        baseAmount: AirlinePrice,
        taxes: { total: AirlinePrice }
    },
    service: Array<AirlineServiceItem>,
    offerItemID: string,
    timeLimits: any,
    mandatoryInd: boolean,
    fareDetail: Array<AirlineFareDetail>,
    orderItemIDs: string,
    reshopDifferential: {
        originalOrderItem: {
            total: {
                amount: AirlinePrice,
                purpose: string
            },
            taxes: {
                total: AirlinePrice,
                breakdown: {
                    tax: Array<AirlineTax>,
                }
            }
        },
        newOfferItem: {
            total: {
                amount: AirlinePrice,
                purpose: string
            },
            taxes: {
                total: AirlinePrice,
                breakdown: {
                    tax: Array<AirlineTax>,
                }
            }
        },
        reshopDue: {
            byPassenger: {
                total: {
                    amount: AirlinePrice,
                    amountType: string,
                    purpose: string
                }
            },
            taxes: {
                collectionInd: boolean,
                total: AirlinePrice,
                breakdown: {
                    tax: Array<AirlineTax>,
                }
            }
        }
    }
}
