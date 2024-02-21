export const cwt = {
  "env": "stg",
  "tenant": "cwt",
  "logo": "cwtDark.png",
  "whiteLogo": "cwtTransparent.png",
  "favIcon": "cwtFavIcon.ico",
  "title": "CWT",
  "theme": "cwt",
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
      "batchSize": 20
    }
  }
};
