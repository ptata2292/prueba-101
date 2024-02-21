import { AirlinePriceViewModel } from "./airline-price";
import { AirlineTaxViewModel } from "./airline-tax";

export type AirlineFareViewModel = {
    orderItemID?: string,
    baseAmount: AirlinePriceViewModel,
    taxes : {
        total: AirlinePriceViewModel,
        taxBreakdown: Array<AirlineTaxViewModel>
    }
}

