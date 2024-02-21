export const config = {
  tokenName: 'LinkrezToken',
  airlinesTokenName: 'AirlinesLinkrezToken',
  hotelsTokenName: 'HotelsLinkrezToken',
  carRentalTokenName: 'CarRentalLinkrezToken',
  golfTokenName: 'GolfLinkrezToken',
  spaTokenName: 'SpaLinkrezToken',
  railTokenName: 'RailLinkrezToken',
  cruiseTokenName: 'CruiseLinkrezToken',
  transportationTokenName: 'TransportationLinkrezToken',
  sessionexpiration: 31536000,
  hotelSessionexpiration: 60,
  encryptionKey: 'uI5r8uYpQ1c8x9swh02/TkgKzOQcmffkENWgp8m73m7VFvrXi0Ol9FHl7IhaKxB7c3s2iBN1pRh2eR/J+Zv3nZme8OcMIh9xsZwjkvaI4J3gdACEghqj88vsDAJdVA3LW38DbwoZF56XLL+6gQhhTyI/30+k6hKDifC65W5mrJHBfLSVsM3gE1jO34o=',
  objectRouting: {
    Flights: {
      name: 'Flights',
      URLLink: 'Airlines',
      class: 'fas fa-plane-departure pr-1 pt-1'
    },
    Hotels: {
      name: 'Hotels',
      URLLink: 'Hotels',
      class: 'fas fa-hotel pr-1 pt-1'
    },
    CarRental: {
      name: 'Car Rental',
      URLLink: 'CarRental',
      class: 'fas fa-car pr-1 pt-1 icon-lg'
    },
    Golf: {
      name: 'Golf',
      URLLink: 'Golf',
      class: 'material-icons pr-1 icon-xl',
      icon: 'golf_course'
    },
    Spa: {
      name: 'Spa',
      URLLink: 'Spa',
      class: 'fas fa-spa pr-1 pt-1 icon-lg'
    },
    Rail: {
      name: 'Rail',
      URLLink: 'Rail',
      class: 'fas fa-train pr-1 pt-1 icon-lg'
    },
    Cruise: {
      name: 'Cruise',
      URLLink: 'Cruise',
      class: 'fas fa-ship pr-1 pt-1 icon-lg'
    },
    Transportation: {
      name: 'Transportation',
      URLLink: 'Transportation',
      class: 'fas fa-bus pr-1 pt-1 icon-lg',
      hidden: true
    }
  }
};
