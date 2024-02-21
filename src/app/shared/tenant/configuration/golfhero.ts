export const golfhero = {
  "env": "stg",
  "tenant": "golfhero",
  "logo": "golfOpenBlue.png",
  "whiteLogo": "golfOpenWhite.png",
  "favIcon": "openGolfFavIcon.png",
  "title": "Golf Hero",
  "theme": "golfhero",
  "loginLogos": [],
  "authorizedModules": ["Airlines", "Hotels", "CarRental", "Golf"],
  "modulesOrder": ["Hotels", "Airlines", "CarRental", "Golf", "Spa", "Rail", "Cruise", "Transportation"],
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
