import { Injectable } from '@angular/core';
import { AirlinePassengerService } from './airline-passenger.service';
import { AirlineOrderStatus } from '../models/order/airline-order-status';
import { AirlinePassenger } from '../models/passenger/airline-passenger';
import { AirlineFareViewModel } from '../viewmodels/airline-fare-price';
import { AirlineFlightViewModel as AirlineFlightViewModel } from '../viewmodels/airline-flight';
import { AirlineOrderViewModel } from '../viewmodels/airline-order';
import { AirlinePassengerSummaryViewModel } from '../viewmodels/airline-passenger';
import { AirlineFlightSegmentViewModel } from '../viewmodels/airline-flight-segment';
import { AirlineSelectedSeatViewModel } from '../viewmodels/airline-selected-seat';
import { ArrayHelperService } from 'src/app/shared/services/array-helper.service';
import { AirlineFareService } from './airline-fare.service';
import { AirlineOfferViewModel } from '../viewmodels/airline-offer';
import { AirlineRetrieveService } from './airline-retrieve.service';
import { AirlineContactViewModel } from '../viewmodels/airline-contact';
import { AirlineOrderByName } from '../models/order/airline-order-by-name';
import { AirlineOrderListItem as AirlineOrderListItemViewModel } from '../viewmodels/airline-order-list-item';
import { AirlineFlightService } from './airline-flight.service';
import { AirlinePaymentService } from './airline-payment.service';

@Injectable({
  providedIn: 'root'
})

export class AirlineOrderService {
  private noData: string = "-";

  constructor(
    private airlineRetrieveService: AirlineRetrieveService,
    private passengerService: AirlinePassengerService,
    private arrayHelperService: ArrayHelperService,
    private flightService: AirlineFlightService,
    private airlinePaymentService: AirlinePaymentService,
    private fareService: AirlineFareService) {
  }

  getOrderViewModel(data: AirlineOrderStatus): AirlineOrderViewModel{
    const [order] = data.response.order;

    if (order.status && order.status.statusCode === 'X') {
      return;
    }

    const [fareDetail] = order.orderItems.orderItem[0].fareDetail;
    const flights = this.fareService.getFlightList(fareDetail.fareComponent);
    const flightFaresInfo = this.flightService.getPriceRules(fareDetail.fareComponent);
    const passengers = [];
    this.arrayHelperService.groupBy(data.response.dataLists.passengerList.passenger, k => k.ptc, v => v).forEach(group => {
      group.value.forEach((el: AirlinePassenger, idx) => {
        this.passengerService.updatePassengerAfterReceiving(el);
        passengers.push(this.getPassengerViewModel(el, idx, data, flights))
      });
    });

    if (passengers.length) {
      passengers[0].showDetails = true;
    }
 
    return {
      orderID: order.orderID,
      bookingReferences: order.bookingReferences.bookingReference,
      flights,
      passengers,
      flightFaresInfo,
      contactList: data.response.dataLists.contactList,
      passengerList: data.response.dataLists.passengerList,
      payments: this.airlinePaymentService.getPaymentViewModel(order.payments?.payment ?? []),
      originalOrderItems: order.orderItems.orderItem
    };
  }

  getTickets(data: AirlineOrderStatus, passenger: AirlinePassenger) : string {
    if(!data.response.ticketDocInfos){
      return;
    }

    let passengerTickets = [];
    data.response.ticketDocInfos.ticketDocInfo.filter(i => i.passengerReference.find(p => p.passengerID === passenger.passengerID)).forEach(t => {
      t.ticketDocument.forEach(d => {
        passengerTickets.push(d.ticketDocNbr);
      })
    });

    let tickets = passengerTickets.join(', ');
    return tickets;
  }

  getPassengerViewModel(passenger: AirlinePassenger, idx: number, data: AirlineOrderStatus, flights: Array<AirlineFlightViewModel>) : AirlinePassengerSummaryViewModel {
    let fare = this.getPassengerFlightFare(data, passenger);
    let ticketNo = this.getTickets(data, passenger);
     
    let result: AirlinePassengerSummaryViewModel = {
      ticketNo: ticketNo,
      data: passenger,
      label: this.passengerService.titleByPtc(passenger.ptc, idx + 1),
      orderSummary: {
        fare: fare,
        selectedSeats: this.getPassengerSelectedSeats(data, passenger, flights)
      }
    };
    return result;
  }

  getPassengerSelectedSeats(data: AirlineOrderStatus, passenger: AirlinePassenger, flights: Array<AirlineFlightViewModel>): Array<{ segment: AirlineFlightSegmentViewModel, seat: AirlineSelectedSeatViewModel }> {
    let result: Array<{ segment: AirlineFlightSegmentViewModel, seat: AirlineSelectedSeatViewModel }> = [];

    data.response.order[0].orderItems.orderItem.forEach(o => {
      let selectedSeatService = o.service.find(s => s.selectedSeat && s.passengerRef.passengerID == passenger.passengerID);
      if (selectedSeatService){
        let segment: AirlineFlightSegmentViewModel = this.getFlightSegment(flights, selectedSeatService.selectedSeat.segmentRef);
        let selectedSeat : AirlineSelectedSeatViewModel = {
          orderItemID: o.orderItemID,
          row: selectedSeatService.selectedSeat.seat.row,
          column: selectedSeatService.selectedSeat.seat.column,
          price: {
            currency : o.priceDetail.totalAmount.detailCurrencyPrice.total.code,
            value: o.priceDetail.totalAmount.detailCurrencyPrice.total.value * 0.01
          },
          passenger: passenger
        };
        result.push({
            seat: selectedSeat,
            segment: segment
        });
      }
    });

    return result;
  }

  getFlightSegment(flights: AirlineFlightViewModel[], segmentRef: string): AirlineFlightSegmentViewModel {
    let segment = null;
    let regex = /<SegmentRef.*>(?<segmentKey>.*)<\/SegmentRef>/gmi;
    let regexResult = regex.exec(segmentRef);
    let segmentKey = regexResult.groups["segmentKey"];

    flights.forEach(f => f.flightSegments.forEach(s => {
      if(s.segmentKey == segmentKey){
        segment = s;
      }
    }));

    return segment;
  }

  getPassengerFlightFare(data: AirlineOrderStatus, passenger: AirlinePassenger) : AirlineFareViewModel {
    let orderItem = data.response.order[0].orderItems.orderItem.find(i => i.fareDetail && i.fareDetail[0].passengerRefs.value.find(p => p.passengerID == passenger.passengerID));
    let vm : AirlineFareViewModel = null;
    if(orderItem){
      vm = this.fareService.fromOrderItem(orderItem);
    }
    return vm;
  }

  bookFlight(offerViewModel: AirlineOfferViewModel, passengers: Array<AirlinePassenger>, contacts: AirlineContactViewModel, payments: any){
    let contactID = "CT1";
    let query = {
      "Query": {
        "order": {
          "offer": []
        },
        "payments": {
        },
        "dataLists": {
          contactList: null,
          passengerList: {passenger: []}
        },
        "metadata": null
      }
    };

    let offerItems = offerViewModel.offerItems.map(offerItem => {
      return {
        passengerRefs: offerItem.fareDetail[0].passengerRefs.value.map(i => i.passengerID),
        offerItemID: offerItem.offerItemID
      };
    });

    let offer = {
      responseID: offerViewModel.responseID,
      offerID: offerViewModel.offerID,
      owner: offerViewModel.owner,
      offerItem: offerItems,
    };

    query.Query.order.offer = [];
    query.Query.order.offer.push(offer);

    let contactProvidedEmail = {
      emailAddress: [
        {
          label: "SAI",
          emailAddressValue: contacts.email.emailAddress
        }
      ] 
    };
    let contactProvidedPhone = {
      phone: [
        {
          label: contacts.phone.label,
          countryDialingCode: contacts.phone.countryDialingCode,
          areaCode: contacts.phone.areaCode,
          phoneNumber: contacts.phone.phoneNumber
        }
      ]
    };
    
    let contactProvided = [];
    contactProvided.push(contactProvidedEmail);
    contactProvided.push(contactProvidedPhone);
    query.Query.dataLists.contactList = {
      contactInformation: [{
        contactID: contactID,
        contactProvided: contactProvided
      }]
    };
    
    if(payments){
      query.Query.payments = payments;
    }
    else {
      delete query.Query.payments;
    }

    passengers.forEach(i => {
      this.passengerService.updatePassengerBeforeSending(i);
      i.contactInfoRef = contactID;
    });
    query.Query.dataLists.passengerList.passenger = passengers;

    return this.airlineRetrieveService.createOrder(query);
  }

  acceptReshop(orderID: string, orderViewModel: AirlineOrderViewModel){
    let offerItems = orderViewModel.changedOrder.offerItems.map(i => ({ 
      offerItemID: i.offerItemID,
      passengerRefs: i.fareDetail[0].passengerRefs.value.map(p => p.passengerID)
    }));

    let request = {
      query: {
        orderServicing: {
          acceptOffer:{
            offer: [{
              offerID: orderViewModel.changedOrder.offerID,
              responseID: orderViewModel.changedOrder.responseID,
              owner: orderViewModel.changedOrder.owner,
              offerItem: offerItems
            }]
          }
        },
        orderID: orderID
      }, 
      dataLists:{
        passengerList: orderViewModel.changedOrder.dataLists.passengerList,
        contactList: orderViewModel.changedOrder.dataLists.contactList
      },
    };

    request.dataLists.passengerList.passenger.forEach(i => this.passengerService.updatePassengerBeforeSending(i));

    return this.airlineRetrieveService.orderChange(request, "Changing flights...", true);
  }

  getOrderByNameViewModel(data: AirlineOrderByName): Array<AirlineOrderListItemViewModel> {
    let orders: Array<AirlineOrderListItemViewModel> = [];
    if(data != null && data.response != null && data.response.orders != null && data.response.orders.order != null) {
      this.arrayHelperService.groupBy(data.response.orders.order, i => i.orderID, v => v).forEach(g => {     
        let order: AirlineOrderListItemViewModel = {
          OrderId : g.key,
          PassengerName : g.value.map(i => i.passengers?.fullName.map(i => i.value).join(', ') || this.noData).join(", "),
          Departure : g.value[0].departure?.date || this.noData,
          Airport : g.value[0].departure?.airportCode?.value || this.noData,
          CreationDate : g.value[0].creationDate || this.noData,
          AgencyName : g.value[0].agency?.name || this.noData,
          AgencyId : g.value[0].agency?.agencyID?.value || this.noData
        }
        orders.push(order);
      });
    }
    return orders;
  }

  getOrderByIdViewModel(data: AirlineOrderStatus): AirlineOrderListItemViewModel {
    let order : AirlineOrderListItemViewModel = {
      OrderId: data.response.order[0].orderID,
      Departure: data.response.order[0].orderItems.orderItem[0].fareDetail[0].fareComponent[0].segmentRefs.value[0].departure.date,
      Airport: data.response.order[0].orderItems.orderItem[0].fareDetail[0].fareComponent[0].segmentRefs.value[0].departure.airportCode.value,
      PassengerName: data.response.dataLists.passengerList.passenger.map(i => i.individual.givenName[0] + " " + i.individual.surname).join(", "),
      AgencyId: this.noData,
      AgencyName: this.noData,
      CreationDate: this.noData
    };

    if(data.party != null && data.party.recipient != null) {
      let travelAgencyRecipient = data.party.recipient.value.travelAgencyRecipient;
      order.AgencyName = travelAgencyRecipient.agentUser.agentUserID.value;
      order.AgencyId =  travelAgencyRecipient.agencyID.value;
    }
    
    return order;
  }  
  
  calculatePassengerSeatsAmount(passenger: AirlinePassengerSummaryViewModel) : number{
    let totalAmount = 0;
    passenger.orderSummary.selectedSeats.forEach(s => totalAmount += s.seat.price.value);
    return totalAmount;
  }

  calculatePassengerAmount(passenger: AirlinePassengerSummaryViewModel) : number{
    let totalAmount = 0;
    totalAmount += passenger.orderSummary.fare.baseAmount.value;
    totalAmount += passenger.orderSummary.fare.taxes.total.value;
    totalAmount += this.calculatePassengerSeatsAmount(passenger);
    return totalAmount;
  }

  calculateTotalAmount(passengers: Array<AirlinePassengerSummaryViewModel>) : number{
    let totalAmount = 0;
    passengers.forEach(i => totalAmount += this.calculatePassengerAmount(i));
    return totalAmount;
  }
}
