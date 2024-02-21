export type AirlinePassenger = {
    passengerID: string,
    birthdate?: string,
    ptc: string,
    individual?: {
        gender: string,
        birthdate: string,
        nameTitle: string,
        givenName: Array<string>,
        middleName: Array<string>,
        surname: string 
    },
    contactInfoRef: string | {
        contactProvided: Array<any>,
        contactID: string
    }
}