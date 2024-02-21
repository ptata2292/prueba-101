import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AirlineContactViewModel } from '../../viewmodels/airline-contact';

@Component({
  selector: 'app-airline-contact-form',
  templateUrl: './airline-contact-form.component.html',
  styleUrls: ['./airline-contact-form.component.css']
})
export class AirlineContactFormComponent implements OnInit {

  public dummyContactData = {
    "EmailAddress": "sai@sai.com",
    "Label": "mobile",
    "CountryDialingCode": "1",
    "AreaCode": "+1",
    "PhoneNumber": "09490977779"
  }

  public contactFG = new FormGroup({   
    EmailAddress: new FormControl('', [Validators.required, Validators.email]), 
    Label: new FormControl('mobile'), 
    CountryDialingCode: new FormControl('1'), 
    AreaCode: new FormControl('', Validators.required), 
    PhoneNumber: new FormControl('', Validators.required)
  });
  
  constructor() { }

  ngOnInit(): void {
    if(!environment.production) {
      this.contactFG.patchValue(this.dummyContactData);
    }
  }

  markAllAsTouched(){
    this.contactFG.markAllAsTouched();
  }

  getContacts() : AirlineContactViewModel {
    let contacts: AirlineContactViewModel = {
      phone: {
        areaCode: this.contactFG.value.AreaCode,
        phoneNumber: this.contactFG.value.PhoneNumber,
        countryDialingCode: this.contactFG.value.CountryDialingCode,
        label: this.contactFG.value.Label
      },
      email: {
        emailAddress: this.contactFG.value.EmailAddress
      }
    }
    return contacts;
  }
}
