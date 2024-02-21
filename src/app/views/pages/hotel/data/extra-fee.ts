export interface ExtraFee { 
    chargeTaxable: "Y"|"N",
    chargeAmount: number,
    chargeType: "Percent" | "Charge",
    chargeBasis: "Per Room"|"By Room"| "By Person",
    chargePeriod: "Per Night"|"Per Stay",
    details: string
}