export type AirlineFlightRuleViewModel = {
    segmentRefs: {
        offpoint: string
        onpoint: string
    },
    allowChange: boolean,
    allowCancel: boolean,
    fareCode: string,
    other: Array<{ name: string, info: string}>
};
