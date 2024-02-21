import { timeFormat } from "src/app/shared/models/airline.model";
import { AirlineFlightFareViewModel } from "./airline-flight-fare";
import { AirlineGrouppedFlightsViewModel } from "./airline-groupped-flights";
import { AirlineSearch } from "./airline-search";
import { AirlineSelectedOfferViewModel } from "./airline-selected-offer";

export type AirlineSearchResult = {
    dataLists: any;
    airlineSearch: AirlineSearch,
    selectedOffer: AirlineSelectedOfferViewModel,
    grouppedFlightList: Array<AirlineGrouppedFlightsViewModel>,  
    isSearchCompleted: boolean;
    responseID?: string; //this.searchResult.shoppingResponseID.responseID,
    //owner: string; //this.shoppingResponseID.owner
    timeFormat: timeFormat
  };