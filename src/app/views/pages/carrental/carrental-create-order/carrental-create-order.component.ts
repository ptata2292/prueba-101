import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { LocalStorage } from '../../../../shared/storage/local-storage';
import { CarrentalOrderService } from '../carrental-order.service';
import { LoginService } from '../../auth/login/login.service';
import { Carrental } from '../carrental';

@Component({
  selector: 'app-carrental-create-order',
  templateUrl: './carrental-create-order.component.html',
  styleUrls: ['./carrental-create-order.component.css']
})
export class CarrentalCreateOrderComponent extends Carrental implements OnInit {

  public selectedCar = {} as any;
  public searchCriteria = {} as any;

  public query = {
    "createOrderRQ": [
      {
        "payloadStdAttributes": {
          "target": "TEST",
          "version": 5.000,
          "transactionStatusCode": "START",
          "retransmissionIndicatorInd": false
        },
        "order": {
          "offer": [
          ],
          "primaryTraveler": {
            "personName": {
              "given": [
              ],
              "surname": ""
            },
            "address": [
              {
                "addressLine": [
                ],
                "city": "",
                "stateProv": {
                  "value": ""
                },
                "country": {
                  "value": ""
                },
                "postalCode": ""
              }
            ],
            "telephone": [
              {
                "phoneNumber": ""
              }
            ],
            "email": [
              {
                "address": ""
              }
            ]
          }
        }
      }
    ]
  }

  public passengerFG = new FormGroup({
    GivenName: new FormControl('', Validators.required),
    Surname: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    Zip: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required)
  });

  public passengerAFG = new FormGroup({
    passengers: new FormArray([])
  });
  passengerArr: FormArray;

  public contactFG = new FormGroup({
    EmailAddressValue: new FormControl('', Validators.required),
    Label: new FormControl('mobile'),
    CountryDialingCode: new FormControl('1'),
    AreaCode: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', Validators.required)
  });

  public creditCardFG = new FormGroup({
    CreditType: new FormControl('', Validators.required),
    CreditCardNumber: new FormControl('', Validators.required),
    SecurityCode: new FormControl('', Validators.required),
    ExpMonth: new FormControl('', Validators.required),
    ExpYear: new FormControl('', Validators.required),
    NameonCard: new FormControl('', Validators.required),
    termsAndConditions: new FormControl(false, Validators.requiredTrue)
  });

  public isSubmitted = false;
  public totalCarCharges = 0;
  public totalTaxes = 0;
  public totalFees = 0;
  public totalAmount = 0;
  public maxDate = new Date();
  public paymentType = this.paymentTypes[0];
  public isLoading = false;
  public carReservationDone = false;

  public ccid = 0;

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
              private carrentalOrderService: CarrentalOrderService, private _snackBar: MatSnackBar) {
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    const selectedCarTxt = this.localStorage.getItem('selectedCar');
    const searchCriteriaTxt = this.localStorage.getItem('carSearchFormGroup');
    if(selectedCarTxt != null && searchCriteriaTxt != null) {
      this.selectedCar = JSON.parse(selectedCarTxt);
      this.searchCriteria = JSON.parse(searchCriteriaTxt);
      // console.log(this.searchCriteria.count);
      // for(let index=1; index <= this.searchCriteria.count; index++){
      //   this.addItem(index);
      // }
      const amount = this.getFare(this.selectedCar.totalPrice);
      this.totalCarCharges = amount.totalCarCharges;
      this.totalTaxes = amount.totalTaxes;
      this.totalFees = amount.totalFees;
      this.totalAmount = amount.totalAmount;
    } else {
      this.router.navigateByUrl('/CarRental/Search');
    }
  }

  ngOnInit() {
  }

  createItem(index: number): FormGroup {
    return new FormGroup({
      Index: new FormControl(index, Validators.required),
      WheelChair: new FormControl(false, Validators.required),
      Birthdate: new FormControl('', Validators.required),
      Gender: new FormControl('', Validators.required),
      NameTitle: new FormControl('Mr', Validators.required),
      GivenName: new FormControl('', Validators.required),
      MiddleName: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      FrequentFlyerNumber: new FormControl(''),
      KnownTravelerNumber: new FormControl(''),
      RegressNumber: new FormControl('')
    });
  }

  addItem(index: number): void {
    this.passengerArr = this.passengerAFG.get('passengers') as FormArray;
    this.passengerArr.push(this.createItem(index));
  }

  isMonthDisable(month) {
    if(this.creditCardFG.value.ExpYear == new Date().getFullYear()){
      if(new Date().getMonth() >= Number(month)) {
        return true;
      }
    }
    return false;
  }

  cancel() {

  }

  carReservation(){
    this.isSubmitted = true;
    if(this.passengerFG.valid) {
      console.log('valid');
      //this.isLoading = true;
      this.prepareQuery();
      this.carrentalOrderService.createOrder(this.query).subscribe((data: any) => {
        this.isLoading = false;
        if(data != null && data.createOrderRS && data.createOrderRS[0].extensionPoint != null && data.createOrderRS[0].extensionPoint.any!= null
          && data.createOrderRS[0].extensionPoint.any.length > 0) {
            let errorMessage = '';
            for(let error of data.createOrderRS[0].extensionPoint.any){
              errorMessage = errorMessage + (error.details || error.reason);
            }
          console.log('createOrder error');
          console.log(errorMessage);
          this._snackBar.open(errorMessage , "OK");
        } else {
          console.log('createOrder success');
          console.log(data);
          if(data != null && data.createOrderRS && data.createOrderRS[0] != null && data.createOrderRS[0].order){
            if(data.createOrderRS[0].order != {} && data.createOrderRS[0].order.confirmationID != null) {
              // this._snackBar.open("Order Id:" + data.response.order.orderID, "OK");
              console.log(data.createOrderRS[0].order.confirmationID);
              let confirmationID = data.createOrderRS[0].order.confirmationID.value;
              this.ccid = confirmationID;
              let amount = this.getTotalFares(data.createOrderRS[0].order.offer[0].totalPrice);
              let chainCode = this.selectedCar.facilityIdentifier.facilityKey.chainCode;
              let surname = this.passengerFG.value.Surname;
              this.totalCarCharges = amount.totalCarCharges;
              this.totalTaxes = amount.totalTaxes;
              this.totalFees = amount.totalFees;
              this.totalAmount = amount.totalAmount;
              this.carReservationDone = true;
              //let surname = data.createOrderRS[0].order.primaryTraveler.personName.surname;
              //let chainCode = data.createOrderRS[0].order.offer[0].facilityIdentifier.facilityKey.chainCode;
              //this.router.navigateByUrl('/Hotels/Orders');
              //this.router.navigateByUrl('/');
              //this.router.navigateByUrl('/CarRental/Status/' + confirmationID);
            }
          }
        }
      }, error=>{
        this.isLoading = false;
        error = error.Error.error;
        if(error != null && error.createOrderRS && error.createOrderRS[0].extensionPoint != null && error.createOrderRS[0].extensionPoint.any!= null
          && error.createOrderRS[0].extensionPoint.any.length > 0) {
            let errorMessage = '';
            for(let errorRes of error.createOrderRS[0].extensionPoint.any){
              errorMessage = errorMessage + (errorRes.details || errorRes.reason);
            }
          console.log('createOrder error');
          console.log(errorMessage);
          this._snackBar.open(errorMessage , "OK");
        }
      });
    } else {
      this.passengerFG.markAllAsTouched();
    }
  }

  prepareQuery() {
    const car = this.selectedCar;
    let startDate = typeof(car.formGroup.start) == 'object' ? (car.formGroup.start.toISOString()).split('T')[0] : new Date(car.formGroup.start).toISOString().split('T')[0];
    let endDate = typeof(car.formGroup.end) == 'object' ? (car.formGroup.end.toISOString()).split('T')[0] : new Date(car.formGroup.end).toISOString().split('T')[0];
    let offer =  {
      "extensionPoint": {
          "any": [
              {
                  "emailNotification": true
              }
          ]
      },
      "product": [
          {
              "@type": "ProductVehicle",
              "category": {
                  "vehicleCode": car.product.category.vehicleCode
              },
              "rateCode": car.product.rateCode,
              "dateTimeSpan": {
                  "timeSpan": {
                      "start": startDate,
                      "end": endDate
                  }
              },
              "pickupTime": car.formGroup.pickupTime,
              "dropoffTime": car.formGroup.dropoffTime
          }
      ],
      "facilityIdentifier": {
          "@type": "FacilityVehicle",
          "facilityKey": {
              "@type": "FacilityKeyVehicle",
              "locationCode": car.facilityIdentifier.facilityKey.locationCode,
              "chainCode": car.facilityIdentifier.facilityKey.chainCode,
              "brandCode": car.facilityIdentifier.facilityKey.brandCode
          }
      }
    };
    this.query.createOrderRQ[0].order.offer = [];
    this.query.createOrderRQ[0].order.offer.push(offer);

    let passengerFGValue = this.passengerFG.value;

    let passenger = {
      "personName": {
        "given": [
          passengerFGValue.GivenName
        ],
        "surname": passengerFGValue.Surname
      },
      "address": [
        {
          "addressLine": passengerFGValue.Address ? [passengerFGValue.Address] : [],
          "city": passengerFGValue.City,
          "stateProv": {
            "value": passengerFGValue.State
          },
          "country": {
            "value": passengerFGValue.Country
          },
          "postalCode": passengerFGValue.Zip
        }
      ],
      "telephone": [
        {
          "phoneNumber": passengerFGValue.Phone
        }
      ],
      "email": [
        {
          "address": passengerFGValue.Email
        }
      ]
    };
    this.query.createOrderRQ[0].order.primaryTraveler = passenger;

    // let creditCardFGValue = this.creditCardFG.value;
    // let payment = {
    //   "formOfPayment": {
    //     "paymentCard": {
    //       "cardCode": creditCardFGValue.CreditType,
    //       "cardHolderName": creditCardFGValue.NameonCard,
    //       "cardNumber": {
    //         "plainText": creditCardFGValue.CreditCardNumber.replace(/ /g, '')
    //       },
    //       "seriesCode": {
    //         "plainText": creditCardFGValue.SecurityCode
    //       },
    //       "expireDate": creditCardFGValue.ExpMonth + (creditCardFGValue.ExpYear + "").substring(2,4)
    //     },
    //     "guaranteeTypeCode": {
    //       "value": "CREDIT_CARD"
    //     }
    //   }
    // };
    //this.query.createOrderRQ[0].order.payment.push(payment);
  }

  public yearChange(event) {
    let date = new Date();
    if(event == date.getFullYear()) {
      let json = this.creditCardFG.value;
      if(json.ExpMonth == null || date.getMonth() >= Number(json.ExpMonth)) {
        const month = date.getMonth() + 1;
        json.ExpMonth = month <= 9 ? "0" + month : "" + month;
        this.creditCardFG.patchValue(json);
      }
    }
  }

  carPayment(){
    let confirmationID = this.ccid;
    this.router.navigateByUrl('/CarRental/Status/' + confirmationID);
  }
}
