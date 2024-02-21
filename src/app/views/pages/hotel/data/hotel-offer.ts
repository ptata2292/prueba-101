import { Hospitality } from "./hospitality";

export interface Offer {
    extensionPoint: any,
    facilityIdentifier: any,
    totalPrice: {
        productPrice: Array<ProductPrice>,
        total: {
            value: number, 
            currencyCode: string
        }
    },
    termsAndConditions,
    product: Hospitality,
    guaranteeTypeCode: { value: string }
}

export interface ProductPrice{
    roomRate: Array<RoomRate>;
}

export interface RoomRate{
    rate: {
        amountBeforeTax: number,
        value: number,
        currencyCode: string,
    },
    taxes: {
        value: number,
        currencyCode: string,
    }
}