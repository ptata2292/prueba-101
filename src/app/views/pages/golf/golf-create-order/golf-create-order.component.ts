import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { LocalStorage } from '../../../../shared/storage/local-storage';
import { GolfOrderService } from '../golf-order.service';
import { LoginService } from '../../auth/login/login.service';
import { Golf } from '../golf';

@Component({
  selector: 'app-golf-create-order',
  templateUrl: './golf-create-order.component.html',
  styleUrls: ['./golf-create-order.component.css']
})
export class GolfCreateOrderComponent extends Golf implements OnInit {

  public selectedFlight = {} as any;
  public searchCriteria = {} as any;
  public queryOld = {
    "Query": {
      "Order": {
        "Offer": [
          {
            "OfferItem": [
              {
                "PassengerRefs": "T1",
                "OfferItemID": "X9DC4432-6BAE-4B3C-AFF7-1-1"
              }
            ],
            "OfferID": "X9DC4432-6BAE-4B3C-AFF7-1",
            "Owner": "AA",
            "ResponseID": "X9DC4432-6BAE-4B3C-AFF7",
            "OrderItem": null
          }
        ]
      },
      "Payments": null,
      "DataLists": {
        "PassengerList": {
          "Passenger": [
            {
              "PTC": "ADT",
              "Individual": {
                "Birthdate": "1983-02-02",
                "Gender": "Female",
                "NameTitle": "MRS",
                "GivenName": "Nithya",
                "MiddleName": null,
                "Surname": "Venkatesan"
              },
              "ContactInfoRef": "ContactInfo-T1",
              "PassengerID": "T1"
            }
          ]
        },
        "ContactList": {
          "ContactInformation": {
            "ContactProvided": [
              {
                "EmailAddress": {
                  "EmailAddressValue": "m.g@gmail.com"
                }
              },
              {
                "Phone": {
                  "Label": "mobile",
                  "CountryDialingCode": "1",
                  "AreaCode": "+1",
                  "PhoneNumber": "6176427743"
                }
              }
            ],
            "ContactID": "ContactInfo-T1"
          }
        }
      },
      "Metadata": null
    },
    "OfferItem": null,
    "SpecialServiceRequest": null
  }
  public query = {
    Query: {
      Order: {
        Offer: [
        ]
      },
      Payments: null,
      DataLists: {
        PassengerList: {
          Passenger: [
          ]
        },
        ContactList: {
          ContactInformation: {
            ContactProvided: [
            ],
            ContactID: "ContactInfo-T1"
          }
        }
      },
      Metadata: null
    },
    OfferItem: null,
    SpecialServiceRequest: null
  }

  public passengerFG = new FormGroup({  
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
    // CreditType: new FormControl('', Validators.required), 
    CreditCardNumber: new FormControl('', Validators.required), 
    SecurityCode: new FormControl('', Validators.required), 
    ExpMonth: new FormControl('', Validators.required), 
    ExpYear: new FormControl('', Validators.required), 
    FirstNameonCard: new FormControl('', Validators.required), 
    LastNameonCard: new FormControl('', Validators.required), 
    Street: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required), 
    PostalCode: new FormControl('', Validators.required), 
    CountryCode: new FormControl('', Validators.required)
  });

  public isSubmitted = false;
  public fareAmount = 0;  
  public baseAmount = 0;
  public facilityCharge = 0;
  public securityServiceFee = 0;
  public maxDate = new Date();
  public paymentType = this.paymentTypes[0];
  public isLoading = false;

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
              private golfOrderService: GolfOrderService, private _snackBar: MatSnackBar) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    const selectedFlightTxt = this.localStorage.getItem('selectedFlight');
    const searchCriteriaTxt = this.localStorage.getItem('searchFormGroup');
    if(selectedFlightTxt != null && searchCriteriaTxt != null) {
      this.selectedFlight = JSON.parse(selectedFlightTxt);
      this.searchCriteria = JSON.parse(searchCriteriaTxt);
      console.log(this.searchCriteria.count);
      for(let index=1; index <= this.searchCriteria.count; index++){
        this.addItem(index);
      }
      const amount = this.getFares(this.selectedFlight.departureFlight.flightFares);
      this.fareAmount = amount.fareAmount;  
      this.baseAmount = amount.baseAmount; 
      this.facilityCharge = amount.facilityCharge; 
      this.securityServiceFee = amount.securityServiceFee; 
    } else {
      this.router.navigateByUrl('/Golfs/Search');
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

  bookFlight(){
    this.isSubmitted = true;
    if(this.passengerAFG.valid && this.contactFG.valid && (this.paymentType == this.paymentTypes[0] || this.creditCardFG.valid)) {
      console.log('valid');
      this.prepareQuery();
      this.isLoading = true;
      this.golfOrderService.createOrder(this.query).subscribe((data: any) => {
        this.isLoading = false;
        if(data.errors!= null && data.errors.error!= null) {
          console.log('createOrder error');
          console.log(data.errors.error.text);
          this._snackBar.open(data.errors.error.text, "OK");
        } else {
          console.log('createOrder success');
          console.log(data);
          if(data != null && data.response!= null && data.response.order != null && data.response.order.orderID != null) {
            // this._snackBar.open("Order Id:" + data.response.order.orderID, "OK");
            console.log(data.response.order.orderID);
            //this.router.navigateByUrl('/Golfs/Orders');
            //this.router.navigateByUrl('/');
            this.router.navigateByUrl('/Golfs/Status/'+ data.response.order.orderID);
          }         
        }
      });
    } else {
      this.passengerAFG.markAllAsTouched();
      this.contactFG.markAllAsTouched();
      if(this.paymentType == this.paymentTypes[1]){
        this.creditCardFG.markAllAsTouched();
      }
    }
  }

  prepareQuery() {
    const flightFare = this.selectedFlight.departureFlight.flightFares.filter((flightFare) => flightFare.selectedFare)[0];
    let offer = {
      OfferItem: [
        {
          PassengerRefs: "T1",
          OfferItemID: flightFare.offerItemID
        }
      ],
      OfferID: flightFare.offerID,
      Owner: this.selectedFlight.departureFlight.shoppingResponseID.owner,
      ResponseID: this.selectedFlight.departureFlight.shoppingResponseID.responseID,
      OrderItem: null
    }
    this.query.Query.Order.Offer = [];
    this.query.Query.Order.Offer.push(offer);

    this.query.Query.DataLists.PassengerList.Passenger = [];
    for(let passenger of this.passengerAFG.value.passengers) {
      const d = passenger.Birthdate.toISOString().slice(0, 10).split('-');   
      const Birthdate =  d[0] + '-' + d[1] + '-' + d[2];
      let passengerObj = {
        PTC: "ADT",
        Individual: {
          Birthdate: Birthdate,
          Gender: passenger.Gender,
          NameTitle: passenger.NameTitle,
          GivenName: passenger.GivenName,
          MiddleName: passenger.MiddleName,
          Surname: passenger.Surname
        },
        // ContactInfoRef: "ContactInfo-T" + passenger.Index,
        ContactInfoRef: "ContactInfo-T1",
        PassengerID: "T" + passenger.Index
      }
      this.query.Query.DataLists.PassengerList.Passenger.push(passengerObj);
    }
    
    const contactValue = this.contactFG.value;
    let contactProvidedEmail = {
      EmailAddress: {
        EmailAddressValue: contactValue.EmailAddressValue
      }
    };
    let contactProvidedPhone = {
      Phone: {
        Label: contactValue.Label,
        CountryDialingCode: contactValue.CountryDialingCode,
        AreaCode: contactValue.AreaCode,
        PhoneNumber: contactValue.PhoneNumber
      }
    };
    this.query.Query.DataLists.ContactList.ContactInformation.ContactProvided = [];
    this.query.Query.DataLists.ContactList.ContactInformation.ContactProvided.push(contactProvidedEmail);
    this.query.Query.DataLists.ContactList.ContactInformation.ContactProvided.push(contactProvidedPhone);
    /*this.golfOrderService.gerOrderById('AA0018281EC52').subscribe((data: any) => {
      console.log('gerOrderById');
      console.log(data)
    });*/
    /*this.golfOrderService.createOrder(this.query).subscribe((data: any) => {
      if(data.errors!= null && data.errors.error!= null) {
        console.log('createOrder error');
        console.log(data.errors.error.text);
      } else {
        console.log('createOrder success');
        console.log(data);
      }
    });*/
  }

}
