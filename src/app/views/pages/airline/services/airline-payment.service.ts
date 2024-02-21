import { Injectable } from '@angular/core';
import { CreditCardService } from 'src/app/shared/services/credit-card.service';
import { AirlinePayment } from '../models/payment/airline-payment';
import { AirlinePassengerSummaryViewModel } from '../viewmodels/airline-passenger';
import { AirlinePaymentViewModel } from '../viewmodels/airline-payment';
import { AirlineRetrieveService } from './airline-retrieve.service';

@Injectable({
  providedIn: 'root'
})
export class AirlinePaymentService {
  static paymentTypeOnHold: string = "On Hold";
  static paymentTypeCreditCard: string = "Credit Card";
  public paymentTypes = [AirlinePaymentService.paymentTypeOnHold, AirlinePaymentService.paymentTypeCreditCard];

  constructor(
    private airlineRetrieveService: AirlineRetrieveService,
    private creditCardService: CreditCardService) {
  }

  pay(creditCard: any, orderId: number) {
    let paymentBody = this.preparePaymentRequestBody(creditCard);
      // console.log(query);
      let paymentReqBody = {
        "version": "17.2",
        "query": {
            "orderID": orderId,
            "payments": paymentBody 
        }
      };

      return this.airlineRetrieveService.orderChange(paymentReqBody, "Process payment...");
  }
  
  // amount = 0.00 will request pay full order, paying multiple transactions for one order item is not possible
  // specifying different value does not affect (at least now) 
  preparePaymentRequestBody(creditCardJSON, amount = "0.00") {
    let paymentObj = {
      "type": "CC",
      "method": {
          "paymentCard": {
              "cardCode": creditCardJSON.CreditType,
              "cardNumber": {
                  "value": creditCardJSON.CreditCardNumber.replace(/ /g, '')
              },
              "seriesCode": {
                  "value": creditCardJSON.SecurityCode
              },
              "cardHolderName": {
                  "value": creditCardJSON.FirstNameonCard + " " + creditCardJSON.LastNameonCard
              },
              "cardHolderBillingAddress": {
                  "street": [
                    creditCardJSON.Street
                  ],
                  "cityName": creditCardJSON.City,
                  "stateProv": creditCardJSON.State,
                  "countryCode": {
                      "value": creditCardJSON.CountryCode
                  },
                  "postalCode": creditCardJSON.PostalCode
              },
              "effectiveExpireDate": {
                  "expiration": creditCardJSON.ExpMonth + (creditCardJSON.ExpYear + "").substring(2,4)
              }
          }
      },
      "amount": {
          "value": amount
      }
    };
    const payment = {
      "payment": [
        paymentObj
      ]
    };
    return payment;
  }

  getPaymentViewModel(payments: Array<AirlinePayment>) : Array<AirlinePaymentViewModel> {
    if(!payments){
      return;
    }  
    let result = payments.map(i => {
      let vm: AirlinePaymentViewModel = {
        orderItemID: i.orderItemID,
        creditCardType: this.creditCardService.findNameByCode(i.method.paymentCardMethod.cardCode),
        creditCardNumber: i.method.paymentCardMethod.maskedCardNumber.value,
        creditCardHolder: i.method.paymentCardMethod.cardHolderName.value,
        amount: i.amount.simpleCurrencyPrice.value * 0.01
      };
      return vm;
    })

    return result;
  }

  calculateDue(payments: Array<AirlinePaymentViewModel>, passengers: Array<AirlinePassengerSummaryViewModel>): number{
    let due = 0;

    passengers.forEach(i => {
      if(i.orderSummary.fare.orderItemID && !payments.find(p => p.orderItemID.indexOf(i.orderSummary.fare.orderItemID) > -1)){
        due += i.orderSummary.fare.baseAmount.value + i.orderSummary.fare.taxes.total.value;
      }

      i.orderSummary.selectedSeats.forEach(seat => {
        if(seat.seat.offerItemID || (seat.seat.orderItemID && !payments.find(p => p.orderItemID.indexOf(seat.seat.orderItemID) > -1))){
          due += seat.seat.price.value;
        }
      });
    })

    return due;
  }
}
