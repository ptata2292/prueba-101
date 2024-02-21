export const travel = {
    "env": "stg",
    "tenant": "travel",
    "logo": "linkrez.svg",
    "whiteLogo": "linkrezWhite.svg",
    "favIcon": "linkrezFavIcon.ico",
    "title": "Linkrez",
    "theme": "travel",
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
            "batchSize": 10
        }
    }
}
