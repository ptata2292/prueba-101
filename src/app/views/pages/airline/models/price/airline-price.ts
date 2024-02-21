export type AirlinePrice = {
    value: number,
    taxable: true,
    code: string //"USD"
}

export type AirlineTotalPrice = {
    detailCurrencyPrice: {
        total: {
          value: number,
          taxable: true,
          code: string //"USD"
        }
    }
}

export type AirlineTax = {
    amount: AirlinePrice,
    nation: string,
    taxCode: string,
    description: string,
    collectionPoint: any
}