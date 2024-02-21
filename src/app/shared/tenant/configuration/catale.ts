export const catale = {
  "env": "stg",
  "tenant": "catale",
  "logo": "cataleLogoLong.png",
  "whiteLogo": "cataleLogoLong.png",
  "favIcon": "cataleFavIcon.png",
  "title": "Catale",
  "theme": "catale",
  "loginLogos": [],
  "authorizedModules": ["Hotels"],
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
