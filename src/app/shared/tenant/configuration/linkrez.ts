export const linkrez = {
    "env": "dev",
    "tenant": "Linkrez",
    "logo": "linkrez.svg",
    "whiteLogo": "linkrezWhite.svg",
    "favIcon": "linkrezFavIcon.ico",
    "title": "Linkrez",
    "theme": "linkrez",
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
};
