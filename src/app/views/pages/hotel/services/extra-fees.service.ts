import { Injectable } from '@angular/core';
import { HotelData } from '../data/hotel-data';
import { ExtraFee } from '../data/extra-fee';
import { Offer } from '../data/hotel-offer';

@Injectable({
  providedIn: 'root'
})
export class ExtraFeesService {

  constructor() { }

  calculateTotal(hotelData: HotelData, offer: Offer) : number {
    if(!hotelData.extraFees || !hotelData.extraFees.length){
      return 0;
    }
    let total = 0;
    hotelData.extraFees.forEach((val) => {
      total += this.calculateTotalForExtraFee(val, offer); 
    });
    return total;
  }

  
  getDesctiptionWithCalculation(hotelData: HotelData, offer: Offer) : Array<ExtraFeeCalculation>{
    if(!hotelData.extraFees || !hotelData.extraFees.length){
      return [];
    }

    let resultItems:Array<ExtraFeeCalculation> = [];
    hotelData.extraFees.forEach((val) => {
      let data: ExtraFeeCalculation = {
        total : this.calculateTotalForExtraFee(val, offer),
        offerPrice : this.offerPrice(offer),
        chargeBasisCoeff : this.chargeBasisCoeff(val, offer),
        chargePeriodCoeff : this.chargePeriodCoeff(val, offer),
        extraFee: val
      };
      data.showCalculation = (val.chargeType == "Percent" || data.chargeBasisCoeff > 1 || data.chargePeriodCoeff > 1);
      resultItems.push(data);
    });
    return resultItems;
  }

  private calculateTotalForExtraFee(val: ExtraFee, offer: Offer) : number {
    let total = 
      this.chargeAmount(val, offer) * 
      this.chargeBasisCoeff(val, offer) * 
      this.chargePeriodCoeff(val, offer);
    return total;
  }

  private chargeAmount(val: ExtraFee, offer: Offer) {
    let total = val.chargeAmount;

    if (val.chargeType === "Percent") {
      total = this.offerPrice(offer) * val.chargeAmount / 100;
    }
    return total;
  }

  private chargePeriodCoeff(val: ExtraFee, offer: Offer) {
    let chargePeriodCoeff = 1;
    if (val.chargePeriod === "Per Night") {
      let numberOfDays = Math.floor((new Date(offer.product.roomStay.dateTimeSpan.timeSpan.end).getTime() - 
                                    new Date(offer.product.roomStay.dateTimeSpan.timeSpan.start).getTime()) / (1000 * 60 * 60 * 24));
      chargePeriodCoeff = numberOfDays;
    }
    return chargePeriodCoeff;
  }

  private chargeBasisCoeff(val: ExtraFee, offer: Offer) {
    let chargeBasisCoeff = 1;
    switch (val.chargeBasis) {
      case "By Person":
        let total = 0;
        offer.product.guestCount.forEach((i) => total += i.value);
        chargeBasisCoeff = total;
        break;
      case "By Room":
      case "Per Room":
        chargeBasisCoeff = 1; //TODO: number of rooms seems unsupported yet. offer.product.numberOfRooms shows sometimes strange numbers like 9 rooms for $50 offer
        // TODO: change to when it will be possible
        break;
    }
    return chargeBasisCoeff;
  }

  private offerPrice(offer: Offer) {
    return offer.totalPrice.productPrice[0].roomRate[0].rate.amountBeforeTax;
  }
}


export class ExtraFeeCalculation{
    total: number;
    offerPrice: number;
    chargeBasisCoeff: number;
    chargePeriodCoeff: number;
    extraFee: ExtraFee;
    showCalculation?: boolean;
}