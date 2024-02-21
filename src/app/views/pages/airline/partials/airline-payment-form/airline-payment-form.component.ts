import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { environment } from '../../../../../../environments/environment';
import { CreditCardService } from 'src/app/shared/services/credit-card.service';
import { AirlinePaymentService } from '../../services/airline-payment.service';

@Component({
  selector: 'app-airline-payment-form',
  templateUrl: './airline-payment-form.component.html',
  styleUrls: ['./airline-payment-form.component.css']
})

export class AirlinePaymentFormComponent extends Airline implements OnInit {
 
  public yearArray = Array(20).fill(null).map((_, i) => new Date().getFullYear() + i);
  public monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  
  public creditCardFG = new FormGroup({   
    CreditType: new FormControl('', Validators.required), 
    CreditCardNumber: new FormControl('', Validators.required), 
    SecurityCode: new FormControl('', Validators.required), 
    ExpMonth: new FormControl('', Validators.required), 
    ExpYear: new FormControl('', Validators.required), 
    FirstNameonCard: new FormControl('', Validators.required), 
    LastNameonCard: new FormControl('', Validators.required), 
    Street: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required), 
    State: new FormControl('', Validators.required),
    PostalCode: new FormControl('', Validators.required), 
    CountryCode: new FormControl('', Validators.required)
  });

  @Input() hidePaymentTypeSelection;

  public paymentTypes: Array<string>;
  public cardTypes: Array<{ name: string; code: string; }>;
  public paymentType;
  public paymentTypeCreditCard: string = AirlinePaymentService.paymentTypeCreditCard;

  constructor(loginService: LoginService, private creditCardService: CreditCardService, private paymentService: AirlinePaymentService) {
    super(loginService)
    
    this.paymentTypes = this.paymentService.paymentTypes;
    this.cardTypes = this.creditCardService.cardTypes;
    this.paymentType = AirlinePaymentService.paymentTypeCreditCard;
  }

  ngOnInit(): void {
    if(!environment.production) {
      this.creditCardFG.patchValue(this.creditCardService.dummyCreditCardData);
    }
  }

  isMonthDisable(month) {
    if(this.creditCardFG.value.ExpYear == new Date().getFullYear()){
      if(new Date().getMonth() >= Number(month)) {
        return true;
      }
    }
    return false;
  }

  yearChange(event) {
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

  isPaymentFormValid() : boolean {
    return (this.paymentType == AirlinePaymentService.paymentTypeOnHold || this.creditCardFG.valid);
  }
  
  markAllAsTouched() {
    if(this.paymentType == AirlinePaymentService.paymentTypeCreditCard){
      this.creditCardFG.markAllAsTouched();
    }
  }
}
