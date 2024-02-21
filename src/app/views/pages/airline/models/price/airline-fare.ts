import { AirlineFlightSegment } from "../flight/airline-flight-segment";
import { AirlinePassenger } from "../passenger/airline-passenger";
import { AirlinePrice, AirlineTax, AirlineTotalPrice } from "./airline-price";

export type AirlineFareDetail = {
    fareIndicatorCode: any;
    passengerRefs: {
        value: Array<AirlinePassenger>,
    },
    price: {
        totalAmount: AirlineTotalPrice
        baseAmount: AirlinePrice,
        taxes: {
            total: AirlinePrice,
            breakdown: {
                tax: Array<AirlineTax>
            }
        }
    },
    fareComponent: Array<AirlineFareComponent>
}

export type AirlineFareComponent = {
    price: {
        totalAmount: AirlineTotalPrice
        baseAmount: AirlinePrice,
        taxes: {
            total: AirlinePrice,
            breakdown: {
                tax: Array<AirlineTax>
            }
        }
    },
    fareBasis: {
        cabinType: { cabinTypeCode: string, cabinTypeName: string},
        fareBasisCityPair: string,
        fareBasisCode: {code: string, refs: Array<{
            fare: { fareCode:string},
            fareBasisCode: { code: string},
            listKey: string
            refs: Array<any>
        }>},

    },
    fareRules: {
        penalty: {
            cancelFeeInd: boolean,
            changeFeeInd: boolean,
            refundableInd: boolean,
            details: {
                detail: Array<{
                    type: "Cancel" | "Change", // maybe some others as well - not found yet
                    refs: Array<{
                        metadataKey: string,
                        ruleID: {value: "Cancel" | "Change" | string},
                        values:{ value: Array<{
                            instruction: {value: string }
                        }>}
                    }>
                }>
            }
        }
    },
    priceClassRef: any,
    segmentRefs: {
        value: Array<AirlineFlightSegment>,
        onpoint: string,
        offpoint: string
    }
}