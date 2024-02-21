export const opentravel = {
    "env": "stg",
    "tenant": "opentravel",
    "logo": "opentravel.svg",
    "whiteLogo": "opentravelWhite.svg",
    "favIcon": "openTravelFavicon.ico",
    "title": "Open Travel",
    "theme": "opentravel",
    "loginLogos": ["Linksrez", "Opentravel", "AmericanAirlines", "Marriott", "AVIS", "IBM", "RedHat"],
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
