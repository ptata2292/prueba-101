import { AirlinePassenger } from "../passenger/airline-passenger";
import { AirlinePayment } from "../payment/airline-payment";
import { AirlinePrice, AirlineTotalPrice } from "../price/airline-price";
import { AirlineBookingReference } from "./airline-booking-reference";
import { AirlineOrderItem } from "./airline-order-item";

export type AirlineOrderStatus = {
    document: any;
    party: any;
    response: {
        dataLists: {
            baggageAllowanceList: any;
            contactList: any;
            fareList: any;
            flightList: any;
            flightSegmentList: any;
            originDestinationList: any;
            instructionsList: any;
            passengerList: {
                passenger: Array<AirlinePassenger>
            }
            priceClassList: any;
            serviceDefinitionList: any;
        },
        order: Array<{
            bookingReferences: {
                bookingReference: Array<AirlineBookingReference>
            },
            totalOrderPrice: AirlineTotalPrice,
            orderID: string,
            owner: string,
            status: {
                statusCode: string
            },
            orderItems: {
                orderItem: Array<AirlineOrderItem>
            },
            payments: {
                payment: Array<AirlinePayment>
            }
        }>,
        metadata: {

        },
        ticketDocInfos:{
            ticketDocInfo: Array<{
                price: AirlinePrice,
                ticketDocument:Array<{
                    numberofBooklets: number,
                    reportingType: string,
                    ticketDocNbr: string,
                    ticketingLocation: string,
                    timeOfIssue: string,
                    type: string,
                    couponInfo: Array<any>
                }>,
                passengerReference: Array<AirlinePassenger>,
                issuingAirlineInfo: {
                    airlineName: string,
                    place: string
                }
            }>
        }
    };
    success: any
    target: string;
    transactionIdentifier: string
    version: string;
    warnings: Array<any>;
    errors: any;
}