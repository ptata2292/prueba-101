import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { getReservationType } from 'src/app/shared/tenant/tenant';
import { LoginService } from '../../../auth/login/login.service';
import { HotelData } from '../../data/hotel-data';
import { Offer } from '../../data/hotel-offer';
import { Hotel } from '../../hotel';
import { ExtraFeesService, ExtraFeeCalculation } from '../../services/extra-fees.service';
import { HotelOrderService } from '../../services/hotel-order.service';

@Component({
  selector: 'app-hotel-create-order',
  templateUrl: './hotel-create-order.component.html',
  styleUrls: ['./hotel-create-order.component.css']
})
export class HotelCreateOrderComponent extends Hotel implements OnInit {

  public selectedRoom = {} as any;
  public searchCriteria = {} as any;
  public query = {
    "createOrderRQ": [
      {
        "payloadStdAttributes": {
          "target": getReservationType(), //environment.hotelTarget.stg,
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
                ""
              ],
              "surname": ""
            },
            "address": [
              {
                "addressLine": [
                  ""
                ],
                "city": "",
                "stateProv": {
                  "value": ""
                },
                "country": {
                  "value": ""
                },
                "postalCode": "",
                "extensionPointDetail": {
                  "any": [
                    {
                      "addressType": "business",
                      "company": "HILTON"
                    }
                  ]
                }
              }
            ],
            "telephone": [
              {
                "phoneNumber": "",
                "remark": "business"
              }
            ],
            "email": [
              {
                "address": "",
                "remark": "business"
              }
            ]
          },
          "payment": []
        }
      }
    ]
  };

  displayedColumns: string[] = ['Item', 'Description', 'Rate', 'Tax', 'Fees', 'Total'];

  public passengerFG = new FormGroup({
    GivenName: new FormControl('', Validators.required),
    Surname: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Address: new FormControl(''),
    City: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    Zip: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required),
    Comments: new FormControl('')
  });

  public roomOccupantAFG = new FormGroup({
    roomOccupants: new FormArray([])
  });
  roomOccupantsArr: FormArray;

  public roomOccupantFG = new FormGroup({
    GivenName: new FormControl('', Validators.required),
    Surname: new FormControl('', Validators.required),
    count: new FormControl('1', Validators.required)
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
  public totalRoomCharges = 0;
  public totalTaxes = 0;
  public totalFees = 0;
  public totalAmount = 0;
  public maxDate = new Date();
  public paymentType = this.paymentTypes[0];
  public isLoading = false;
  public selectedStates = [];
  public selectedCountries = [];

  @ViewChild('appDialog') appDialog: DialogComponent;

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
              private hotelOrderService: HotelOrderService, private _snackBar: MatSnackBar,
              private dialogService: DialogService, private cdRef: ChangeDetectorRef,
              private extraFeesService: ExtraFeesService) {
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    const selectedRoomTxt = this.localStorage.getItem('selectedRoom');
    const searchCriteriaTxt = this.localStorage.getItem('hotelSearchFormGroup');
    if(selectedRoomTxt != null && searchCriteriaTxt != null) {
      this.selectedRoom = JSON.parse(selectedRoomTxt);
      this.searchCriteria = JSON.parse(searchCriteriaTxt);
      console.log(this.searchCriteria.rooms);
      for(let index=1; index <= this.searchCriteria.rooms; index++){
        this.addItem(index, this.searchCriteria);
      }
      const amount = this.getFares(this.selectedRoom.rooms);
      this.totalRoomCharges = amount.totalRoomCharges;
      this.totalTaxes = amount.totalTaxes;
      this.totalFees = amount.totalFees;
      this.totalAmount = amount.totalAmount;
    } else {
      this.router.navigateByUrl('/Hotels/Search');
    }
  }

  ngOnInit() {
    this.selectedCountries = this.countries;
    this.passengerFG.controls.Country.setValue(this.countries[0].countryCode);
    this.selectedStates = this.states.filter(state=>state.countryCode===this.countries[0].countryCode);
    this.passengerFG.get('Country').valueChanges.subscribe(
      (country) => {
          if(country){
          this.selectedStates = this.states.filter(state=>state.countryCode===country);
          this.passengerFG.controls.State.setValue('');
        }
      });
  }

  public ngAfterViewInit(): void {
    this.dialogService.register(this.appDialog, "Alert", "Do you want to cancel the Hotel Booking?");
    this.cdRef.detectChanges();
  }

  extraFeeDesctiptionWithCalculation(hotelData: HotelData, offer: Offer): Array<ExtraFeeCalculation>{
    return this.extraFeesService.getDesctiptionWithCalculation(hotelData, offer);
  }

  onStateKey(value) {
    this.selectedStates = this.stateSearch(value);
  }

  onCountryKey(value) {
    this.selectedCountries = this.countrySearch(value);
  }

  createItem(index: number, searchCriteria): FormGroup {
    return new FormGroup({
      Index: new FormControl(index, Validators.required),
      GivenName: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      count: new FormControl(searchCriteria.count, Validators.required)
    });
  }

  addItem(index: number, searchCriteria): void {
    this.roomOccupantsArr = this.roomOccupantAFG.get('roomOccupants') as FormArray;
    this.roomOccupantsArr.push(this.createItem(index, searchCriteria));
  }

  isMonthDisable(month) {
    if(this.creditCardFG.value.ExpYear == new Date().getFullYear()){
      if(new Date().getMonth() >= Number(month)) {
        return true;
      }
    }
    return false;
  }

  changeFirstName(){
    let json = this.roomOccupantAFG.value;
    json.roomOccupants[0].GivenName = this.passengerFG.value.GivenName;
    this.roomOccupantAFG.patchValue(json);
    console.log('firstName: '+ this.passengerFG.value.GivenName);
  }

  changeSurname(){
    let json = this.roomOccupantAFG.value;
    json.roomOccupants[0].Surname = this.passengerFG.value.Surname;
    this.roomOccupantAFG.patchValue(json);
  }

  showDialog() {
    this.dialogService.show()
      .then((res) => {
        console.log('ok clicked');
        this.cancel();
      })
      .catch((err) => {
        console.log('cancel clicked');
      });
  }

  cancel() {
    this.localStorage.removeItem('selectedRoom');
    this.router.navigateByUrl('/Hotels/Search');
  }

  bookRoom(){
    this.isSubmitted = true;
    if(this.passengerFG.valid && this.roomOccupantAFG.valid && this.creditCardFG.valid) {
      console.log('valid');
      this.isLoading = true;
      this.prepareQuery();
      //console.log(JSON.stringify(this.query));
      this.hotelOrderService.createOrder(this.query).subscribe((data: any) => {
        this.isLoading = false;
        if(data != null && data.createOrderRS && data.createOrderRS[0].result != null && data.createOrderRS[0].result.errors!= null
          && data.createOrderRS[0].result.errors.length > 0) {
            let errorMessage = '';
            for(let error of data.createOrderRS[0].result.errors){
              if(error.shortText || error.value){
                errorMessage = errorMessage + (error.shortText || error.value);
              }
            }
            if(errorMessage == ''){
              errorMessage = data.createOrderRS[0].result.status.value;
            }
          console.log('createOrder error');
          console.log(errorMessage);
          this._snackBar.open(errorMessage , "OK");
        } else {
          console.log('createOrder success');
          console.log(data);
          if(data != null && data.createOrderRS && data.createOrderRS[0] != null && data.createOrderRS[0].result != null && data.createOrderRS[0].result.status != null
            && data.createOrderRS[0].result.status.value == 'COMPLETE'
            && (data.createOrderRS[0].result.errors!= null && data.createOrderRS[0].result.errors.length == 0)){
              if(data.createOrderRS[0].order != {} && data.createOrderRS[0].order.confirmationID != null) {
                // this._snackBar.open("Order Id:" + data.response.order.orderID, "OK");
                console.log(data.createOrderRS[0].order.confirmationID);
                let confirmationID = data.createOrderRS[0].order.confirmationID.value;
                let surname = data.createOrderRS[0].order.primaryTraveler.personName.surname;
                let chainCode = data.createOrderRS[0].order.offer[0].facilityIdentifier.facilityKey.chainCode;
                //this.router.navigateByUrl('/Hotels/Orders');
                //this.router.navigateByUrl('/');
                this.router.navigateByUrl('/Hotels/Status/'+ confirmationID+'/'+chainCode+'/'+surname);
              }
          }
        }
      }, error=>{
        this.isLoading = false;
        let errorMessage = '';
        if(error.Error.extensionPoint){
          errorMessage = error.Error.extensionPoint.any[0].errors[0].notifications[0].message;
        } else {
          errorMessage = 'Booking Failed';
        }
        this._snackBar.open(errorMessage , "OK");

      });
    } else {
      this.passengerFG.markAllAsTouched();
      this.roomOccupantAFG.markAllAsTouched();
      this.creditCardFG.markAllAsTouched();
      this.creditCardFG.get('termsAndConditions').markAsDirty();
    }
  }


  prepareQuery() {
    this.query.createOrderRQ[0].order.payment = [];
    const room : Offer = this.selectedRoom.rooms[0];
    let startDate = this.selectedRoom.dateTimeSpan.start;
    let endDate = this.selectedRoom.dateTimeSpan.end;
    let offer =  {
      "product": [
        {
          "@type": "ProductHospitality",
          "roomStay": {
            "roomType": {
              "code": {
                "value": room.product.roomStay.roomType.code.value
              }
            },
            "ratePlan": {
              "ratePlanCode": {
                "value": room.product.roomStay.ratePlan.ratePlanCode.value
              },
              "ratePlanName": room.product.roomStay.ratePlan.ratePlanName
            },
            "extensionPoint": {
              "any": [
                  {
                      "bookingCode": room.product.roomStay.extensionPoint && room.product.roomStay.extensionPoint.any[0].bookingCode || ''
                  }
              ]
          }
          },
          "guestCount": [
            {
                "ageQualifyingCode": "ADULT",
                "value": this.roomOccupantAFG.value.roomOccupants[0].count
            }
          ],
          "dateTimeSpan": {
            "timeSpan": {
              "start": startDate,
              "end": endDate
            }
          }
        }
      ],
      "facilityIdentifier": {
        "@type": "FacilityHotel",
        "facilityKey": {
            "@type": "FacilityKeyHotel",
            "facilityCode": room.facilityIdentifier.facilityKey.facilityCode,
            "chainCode": room.facilityIdentifier.facilityKey.chainCode,
            "brandCode": room.facilityIdentifier.facilityKey.brandCode
        }
    },
    "extensionPoint": room.extensionPoint
    }
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
          "postalCode": passengerFGValue.Zip,
          "extensionPointDetail": {
            "any": [
              {
                "addressType": "business",
                "company": "HILTON"
              }
            ]
          }
        }
      ],
      "telephone": [
        {
          "phoneNumber": passengerFGValue.Phone,
          "remark": "business"
        }
      ],
      "email": [
        {
          "address": passengerFGValue.Email,
          "remark": "business"
        }
      ]
    };
    this.query.createOrderRQ[0].order.primaryTraveler = passenger;

    let creditCardFGValue = this.creditCardFG.value;
    let payment = {
      "formOfPayment": {
        "paymentCard": {
          "cardCode": creditCardFGValue.CreditType,
          "cardHolderName": creditCardFGValue.NameonCard,
          "cardNumber": {
            "plainText": creditCardFGValue.CreditCardNumber.replace(/ /g, '')
          },
          "seriesCode": {
            "plainText": creditCardFGValue.SecurityCode
          },
          "expireDate": creditCardFGValue.ExpMonth + (creditCardFGValue.ExpYear + "").substring(2,4)
        },
        "guaranteeTypeCode": room.guaranteeTypeCode || {
          "value": "CREDIT_CARD"
        }
      }
    };
    this.query.createOrderRQ[0].order.payment.push(payment);
  }

  //   const contactValue = this.contactFG.value;
  //   let contactProvidedEmail = {
  //     EmailAddress: {
  //       EmailAddressValue: contactValue.EmailAddressValue
  //     }
  //   };
  //   let contactProvidedPhone = {
  //     Phone: {
  //       Label: contactValue.Label,
  //       CountryDialingCode: contactValue.CountryDialingCode,
  //       AreaCode: contactValue.AreaCode,
  //       PhoneNumber: contactValue.PhoneNumber
  //     }
  //   };
  //   this.query.Query.DataLists.ContactList.ContactInformation.ContactProvided = [];
  //   this.query.Query.DataLists.ContactList.ContactInformation.ContactProvided.push(contactProvidedEmail);
  //   this.query.Query.DataLists.ContactList.ContactInformation.ContactProvided.push(contactProvidedPhone);
  //   /*this.hotelOrderService.gerOrderById('AA0018281EC52').subscribe((data: any) => {
  //     console.log('gerOrderById');
  //     console.log(data)
  //   });*/
  //   /*this.hotelOrderService.createOrder(this.query).subscribe((data: any) => {
  //     if(data.errors!= null && data.errors.error!= null) {
  //       console.log('createOrder error');
  //       console.log(data.errors.error.text);
  //     } else {
  //       console.log('createOrder success');
  //       console.log(data);
  //     }
  //   });*/
  // }

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
}
