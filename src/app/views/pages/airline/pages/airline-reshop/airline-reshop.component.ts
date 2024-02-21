import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { timeFormat } from 'src/app/shared/models/airline.model';
import { AirlineAirport } from '../../models/flight/airline-airport';
import { AirlineSearchFlight } from '../../models/flight/airline-search-flight';
import { AirlineOrderStatus } from '../../models/order/airline-order-status';
import { AirlineReshopOffer, AirlineReshopResponse } from '../../models/order/airline-reshop';
import { AirlineSearchHeaderComponent } from '../../partials/airline-search-header/airline-search-header.component';
import { AirlineChangeOrderService } from '../../services/airline-change-order.service';
import { AirlineDatetimeService } from '../../services/airline-datetime.service';
import { AirlineOfferService } from '../../services/airline-offer.service';
import { AirlineOrderService } from '../../services/airline-order.service';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { AirlineOrderViewModel } from '../../viewmodels/airline-order';
import { AirlineSearch } from '../../viewmodels/airline-search';
import { AirlineSearchResult } from '../../viewmodels/airline-search-result';

@Component({
  selector: 'app-airline-reshop',
  templateUrl: './airline-reshop.component.html',
  styleUrls: ['./airline-reshop.component.scss']
})
export class AirlineReshopComponent implements OnInit {

  @ViewChild(AirlineSearchHeaderComponent) airlineSearchHeader: AirlineSearchHeaderComponent;

  orderId;
  searchResult: AirlineSearchResult;
  orderViewModel: AirlineOrderViewModel;
  search: AirlineSearch;
  
  constructor(private router: Router, 
    private airlineOrderService: AirlineOrderService,
    private activatedRoute: ActivatedRoute,
    private offerService: AirlineOfferService,
    private airlineDatetimeService: AirlineDatetimeService,
    private airlineChangeOrderService: AirlineChangeOrderService,
    private airlineRetrieveService: AirlineRetrieveService) { 
    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
    });

    if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.orderViewModel){
      this.orderViewModel = this.router.getCurrentNavigation().extras.state.orderViewModel;
      this.initAirlineSearch();
    }
    else{
      this.airlineRetrieveService.getOrderById(this.orderId).subscribe((data: AirlineOrderStatus) => {
        this.orderViewModel = this.airlineOrderService.getOrderViewModel(data);
        this.initAirlineSearch();
      });
    }
  }

  ngOnInit(): void {
    
    this.searchResult = {
      isSearchCompleted: false,
      timeFormat: localStorage.getItem('timeFormat') as timeFormat || '24',
      selectedOffer: null,
      grouppedFlightList: null,
      airlineSearch: null,
      dataLists: null
    };
  }

  initAirlineSearch(){
    let flights = this.orderViewModel.flights.map(f => {
      let from: AirlineAirport = <AirlineAirport>{ 
        id: f.departureAirportCode, 
        data: f.departureAirportCode, 
        value: f.departureAirportName 
      };
      let to: AirlineAirport = <AirlineAirport>{ 
        id: f.arrivalAirportCode, 
        data: f.arrivalAirportCode, 
        value: f.arrivalAirportName
      };
      let departureDate: Date = new Date(f.departureDate);
      let flight: AirlineSearchFlight = {
        from: from,
        to: to, 
        departureDate: departureDate
      }
      return flight;
    });

    this.search = {
      flights: flights,
      travellers: this.orderViewModel.passengers.map((p, i) => ({ptc: p.data.ptc, index: i})),
      isLoyaltyAccountEnabled: false,
      loyaltyAccountNumber: '',
      tripType: this.orderViewModel.flights.length === 1 ? "one" : 
        this.orderViewModel.flights.length == 2 &&
        this.orderViewModel.flights[0].departureAirportCode == this.orderViewModel.flights[1].arrivalAirportCode && 
        this.orderViewModel.flights[0].arrivalAirportCode == this.orderViewModel.flights[1].departureAirportCode ? "round" : "multi"
    }; 
  }

  backToOrderDetails(){
    this.router.navigateByUrl('/Airlines/Orders/' + this.orderId, { state: { orderViewModel: this.orderViewModel }});
  }

  searchAirlines(){
    this.searchResult.selectedOffer = null;
    this.searchResult.grouppedFlightList = null;

    let query = {
      query: {
        orderID: this.orderId,
        reshop: {
          orderServicing: {
            add: {
              flightQuery:{
                originDestinations:{
                  originDestination: this.search.flights.map(i => ({ departure: { airportCode: { value: i.from.data}, date: this.airlineDatetimeService.truncateTime(i.departureDate)}, arrival: {airportCode: {value: i.to.data}}}))
                }
              }
            },
            delete: {
              orderItem: this.orderViewModel.originalOrderItems.map(i => ({orderItemID: i.orderItemID}))
            }
          }
        }
      } 
    }

    this.airlineRetrieveService.orderReshop(query).subscribe((data: AirlineReshopResponse) => { 
      this.searchResult.responseID = data.response.reShoppingResponseID.responseID.value;
      this.searchResult.dataLists = data.response.dataLists;
      this.searchResult.grouppedFlightList = this.offerService.groupReshopOffers(data.response.reshopOffers.reshopOffer, this.searchResult.timeFormat);
      this.searchResult.isSearchCompleted = true;
    });
  }
  
  reshop(){
    let responseID = this.searchResult.responseID;
    let selectedReshop : AirlineReshopOffer = <AirlineReshopOffer>this.searchResult.selectedOffer.originalOffer;
    let offerViewModel = this.offerService.getReshopOfferViewModel(selectedReshop, this.searchResult.dataLists, responseID);
    this.orderViewModel.changedOrder = offerViewModel;
    this.airlineChangeOrderService.addChange("ChangeFlight", this.orderId);
    this.router.navigateByUrl('/Airlines/Orders/' + this.orderId, {state: { orderViewModel: this.orderViewModel }});
  }
}
