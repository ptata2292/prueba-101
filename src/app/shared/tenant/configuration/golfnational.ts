export const golfnational = {
  "env": "stg",
  "tenant": "golfnational",
  "logo": "leGolfNational.png",
  "whiteLogo": "leGolfNationalWhite.png",
  "favIcon": "golfNationalFavIcon.png",
  "title": "Le Golf National",
  "theme": "golfnational",
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
