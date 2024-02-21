export const military = {
    "env": "dev",
    "tenant": "military",
    "logo": "militaryTravelers.png",
    "whiteLogo": "militaryTravelersWhite.png",
    "favIcon": "militaryTravelersFavIcon.ico",
    "title": "Military Travellers",
    "theme": "military",
    "loginLogos": [],
    "authorizedModules": ["Airlines", "Hotels", "CarRental", "Golf", "Spa", "Rail", "Cruise", "Transportation"],
    "modulesOrder": ["Airlines", "Hotels", "CarRental", "Golf", "Spa", "Rail", "Cruise", "Transportation"],
    "module": {
        "airline": {
            "carrierAirlineID": [ "AA" ],
        },
        "hotel": {
            "chainCode": [],
            "skipHotelSearchSelectionStep": true,
            "distance": 25,
            "batchSize": 20
        }
    }
}
