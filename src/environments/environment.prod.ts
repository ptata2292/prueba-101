export const environment = {
  production: true,
  version: "1.0.50",
  releaseDate: "2022-07-05",
  airlinesApiEndpointNET: 'https://airlineapi.dev.linksrez.com/api/',
  airApiEndpoint: {
    dev: 'https://air-api.dev.linksrez.com/api/',
    stg: 'https://air-api.dev.linksrez.com/api/',
    prd: 'https://air-api.dev.linksrez.com/api/'
  },
  hotelsApiEndpoint: {
    dev: 'https://api.dev.linksrez.com/',
    stg: 'https://api.stg.linksrez.com/',
    prd: 'https://api.linksrez.com/'
  },
  hotelsImgEndpoint: 'https://test-hotelapi2staging.linksrez.com/api/values',
  carRentalApiEndpoint: {
    dev: 'https://api.stg.linksrez.com/',
    stg: 'https://api.stg.linksrez.com/',
    prd: 'https://api.stg.linksrez.com/'
  },
  golfApiEndpoint: 'https://airlineapi.dev.linksrez.com/api/',
  spaApiEndpoint: 'https://airlineapi.dev.linksrez.com/api/',
  railApiEndpoint: 'https://airlineapi.dev.linksrez.com/api/',
  cruiseApiEndpoint: 'https://airlineapi.dev.linksrez.com/api/',
  transportationApiEndpoint: 'https://airlineapi.dev.linksrez.com/api/',
  tenants : [
    {
      urls: ["air-poc", "localhost", "portal.linksrez.com"],
      tenant: "linkrez"
    },
    {
      urls: ["travel.linksrez"],
      tenant: "travel"
    },
    {
      urls: ["opentravel",  "ota.linksrez.com", "travelapi.opentravel.org"],
      tenant: "opentravel"
    },
    {
      urls: ["fullofdreams"],
      tenant: "fullofdreams"
    },
    {
      urls: ["simplenight"],
      tenant: "simplenight"
    },
    {
      urls: ["military", "military-travel", "military-travel.linksrez.com"],
      tenant: "military"
    },
    {
      urls: ["cwt"],
      tenant: "cwt"
    },
    {
      urls: ["golfhero", "golfherohotels"],
      tenant: "golfhero"
    },
    {
      urls: ["golfnational", "le-golf-national", "legolfnational", "golf-national", "le-golf", "le-golfnational"],
      tenant: "golfnational"
    },
    {
      urls: ["golfopen", "theopen", "opengolf"],
      tenant: "golfopen"
    },
    {
      urls: ["mykey", "mykey.linksrez.com"],
      tenant: "mykey"
    },
    {
      urls: ["catale", "catale.linksrez.com"],
      tenant: "calate"
    }
  ],
  hotelTarget: {
    dev: 'TEST',
    stg: 'TEST',
    prd: 'PRODUCTION'
  }
};
