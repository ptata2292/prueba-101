export const simplenight = {
  "env": "stg",
  "tenant": "simplenight",
  "logo": "simplenightWhite.svg",
  "whiteLogo": "simpleNightWhite.png",
  "favIcon": "simpleNightFavIcon.ico",
  "title": "Simple Night",
  "theme": "simplenight",
  "loginLogos": [],
  "authorizedModules": ["Airlines", "Hotels"],
  "modulesOrder": ["Hotels", "Airlines", "CarRental", "Golf", "Spa", "Rail", "Cruise", "Transportation"],
  "module": {
    "airline": {
      "carrierAirlineID": [ "AA" ],
    },
    "hotel": {
      "chainCode": [],
      "skipHotelSearchSelectionStep": true,
      "distance": 10,
      "batchSize": 10
    }
  }
};
