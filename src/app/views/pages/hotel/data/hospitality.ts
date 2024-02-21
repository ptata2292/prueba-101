export interface Hospitality { 
    guestCount: [{
        ageQualifyingCode: string,
        value: number,
    }],
    numberOfRooms: number,
    roomStay: {
        extensionPoint: any,
        ratePlan: any,
        roomType: { 
            code: any,
            description: any
        },
        dateTimeSpan:{
            duration: Array<any>,
            timeSpan: {start: string, end: string}
        }
    }
}