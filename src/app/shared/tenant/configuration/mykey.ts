export const mykey = {
  "env": "stg",
  "tenant": "mykey",
  "logo": "myKeyLogo.png",
  "whiteLogo": "myKeyLogo.png",
  "favIcon": "myKeyFavIcon.ico",
  "title": "MyKey",
  "theme": "mykey",
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
