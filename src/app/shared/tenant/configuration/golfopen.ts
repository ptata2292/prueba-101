export const golfopen = {
  "env": "stg",
  "tenant": "golfopen",
  "logo": "openGolfTransparent.png",
  "whiteLogo": "openGolfTransparent.png",
  "favIcon": "openGolfFavIcon.png",
  "title": "Open Golf",
  "theme": "golfopen",
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
