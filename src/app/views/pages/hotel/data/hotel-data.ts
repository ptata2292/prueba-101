import { ExtraFee } from "./extra-fee"

export interface HotelData {
    selected?: boolean;
    extraFees?: Array<ExtraFee>,
    relativePosition: {
        distance: string 
    },
    location: { address: any },
    basicPropertyInfo: {
        brandCode: string,
        chainCode: string,
        code: string,
        name: string
    }
}