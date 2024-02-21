import { Injectable } from '@angular/core';
import { ArrayHelperService } from 'src/app/shared/services/array-helper.service';
import { AirlineOfferWithDetails } from '../models/offer/airline-offer-details';
import { AirlineOfferItem } from '../models/offer/airline-offer-item';
import { AirlineOrderItem } from '../models/order/airline-order-item';
import { AirlineFareComponent } from '../models/price/airline-fare';
import { AirlineFareViewModel } from '../viewmodels/airline-fare-price';
import { AirlineFlightViewModel } from '../viewmodels/airline-flight';
import { AirlineFlightFareViewModel } from '../viewmodels/airline-flight-fare';
import { AirlinePriceViewModel } from '../viewmodels/airline-price';
import { AirlineTaxViewModel } from '../viewmodels/airline-tax';
import { AirlineDatetimeService } from './airline-datetime.service';
import { AirlineFlightService } from './airline-flight.service';
import {AirlineFlightRuleViewModel} from '../viewmodels/airline-flight-rule';
import { AirlineReshopOffer } from '../models/order/airline-reshop';

@Injectable({
  providedIn: 'root'
})
export class AirlineFareService { 

  constructor(
      private airlineDatetimeService: AirlineDatetimeService,
      private airlineFlightService: AirlineFlightService,
    private arrayHelper: ArrayHelperService){ }

  flightFareFromOffer(offer: AirlineOfferWithDetails): AirlineFlightFareViewModel{
    const [fareDetail] = offer.offerItem[0].fareDetail;
    return {
      originalOffer: offer,
      totalPrice: Number(offer.totalPrice.detailCurrencyPrice.total.value) * 0.01,
      cabinType: fareDetail.fareComponent[0].fareBasis.cabinType.cabinTypeName.includes('COACH') ? 'Economy' : 'First Class',
      offerID: offer.offerID,
      flightRules: this.airlineFlightService.getPriceRules(fareDetail.fareComponent),
    };
  }

  flightFareFromReshop(offer: AirlineReshopOffer): AirlineFlightFareViewModel{
    const [fareDetail] = offer.addOfferItem[0].fareDetail;
    return {
      originalOffer: offer,
      reshopPrices: {
        original: this.arrayHelper.sum(offer.addOfferItem.map(i => i.reshopDifferential.originalOrderItem.total.amount.value * 0.01 + i.reshopDifferential.originalOrderItem.taxes.total.value * 0.01)),
        newItem: this.arrayHelper.sum(offer.addOfferItem.map(i => i.reshopDifferential.newOfferItem.total.amount.value * 0.01)),
        reshopDue: this.arrayHelper.sum(offer.addOfferItem.map(i => i.reshopDifferential.reshopDue.byPassenger.total.amount.value * 0.01)),
      },
      totalPrice: Number(offer.totalPrice.detailCurrencyPrice.total.value) * 0.01,
      cabinType: fareDetail.fareComponent[0].fareBasis.cabinType.cabinTypeName.includes('Economy') ? 'Economy' : 'First Class',
      offerID: offer.offerID,
      flightRules: this.airlineFlightService.getPriceRules(fareDetail.fareComponent),
    };
  }

  getFlightList(fares: Array<AirlineFareComponent>): AirlineFlightViewModel[]{
    return fares.map(i => this.airlineFlightService.createFlightViewModel(i.segmentRefs.value, i));
  }

  fromPricedOfferItem(offerItem: AirlineOfferItem): AirlineFareViewModel {
    let fare = offerItem.fareDetail[0].price;
    let taxes: Array<AirlineTaxViewModel> = fare.taxes.breakdown.tax.map(tax => {
      return {
        description: tax.description,
        amount: {
          value: tax.amount.value  * 0.01,
          currency: tax.amount.code
        },
      };
    });

    var vm = {
      baseAmount : {
        value: fare.baseAmount.value * 0.01,
        currency: fare.baseAmount.code
      },
      taxes: {
        total: {
          value: fare.taxes.total.value * 0.01,
          currency: fare.taxes.total.code
        },
        taxBreakdown: this.grouppedTaxBreakdown(taxes)
      }
    };

    return vm;
  }

  fromOrderItem(orderItem: AirlineOrderItem): AirlineFareViewModel{
    let fare = orderItem.fareDetail[0].price;
    let taxes: Array<AirlineTaxViewModel> = fare.taxes.breakdown.tax.map(tax => {
      return {
        description: tax.description,
        amount: {
          value: tax.amount.value  * 0.01,
          currency: tax.amount.code
        },
      };
    });

    var vm = {
      orderItemID: orderItem.orderItemID,
      baseAmount : {
        value: fare.baseAmount.value * 0.01,
        currency: fare.baseAmount.code
      },
      taxes: {
        total: {
          value: fare.taxes.total.value * 0.01,
          currency: fare.taxes.total.code
        },
        taxBreakdown: this.grouppedTaxBreakdown(taxes)
      }
    };

    return vm;
}

  private grouppedTaxBreakdown(taxes: AirlineTaxViewModel[]) {
    let grouppedTaxes = this.arrayHelper.groupBy(taxes, k => k.description, v => v, t => this.calculateTaxTotal(t));
    this.arrayHelper.sortBy(grouppedTaxes, [i => i.total.value], 'desc');
    let taxBreakdown = grouppedTaxes.map(i => {
      return {
        description: i.key,
        amount: {
          value: i.total.value,
          currency: i.total.currency
        },
      };
    });
    return taxBreakdown;
  }

  calculateTaxTotal(data: Array<AirlineTaxViewModel>): AirlinePriceViewModel{
    let total = 0;
    data.forEach((tax) => {
      total += tax.amount.value;
    });
    return { value: total, currency: data[0].amount.currency} ;
  }
}
