import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { environment } from '../../../../../../environments/environment';
import { AirlinePassengerService } from '../../services/airline-passenger.service';
import { AirlinePassenger } from '../../models/passenger/airline-passenger';
import { ArrayHelperService } from 'src/app/shared/services/array-helper.service';
import { AirlinePassengerSummaryViewModel } from '../../viewmodels/airline-passenger';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import * as equal from 'fast-deep-equal';
import { dirtyCheck } from 'src/app/operators/dirtyCheck';

@Component({
  selector: 'app-airline-passenger-form',
  templateUrl: './airline-passenger-form.component.html',
  styleUrls: ['./airline-passenger-form.component.css']
})
export class AirlinePassengerFormComponent extends Airline implements OnInit {
  
  public passengersFormGroup;

  @Input() passengers: Array<AirlinePassengerSummaryViewModel>;
  @Input() loyaltyAccountNumber: string;
  @Input() isLoyaltyAccountEnabled: boolean;  
  @Output() passengerChanges = new EventEmitter<boolean>();
  
  public gender = ["MALE", "FEMALE"];
  public countries = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mcdonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis"];

  constructor(loginService: LoginService, private formBuilder: FormBuilder, private passengerService: AirlinePassengerService, private arrayHelperService: ArrayHelperService) {
    super(loginService);

    this.passengersFormGroup = this.formBuilder.group({
      passengers : this.formBuilder.array([])
    });
  }

  get passengersFormArr(): FormArray {
    return this.passengersFormGroup.get('passengers') as FormArray;
  }

  ngOnInit(): void {
    let originalPassengers = { passengers: [] };
    this.arrayHelperService.groupBy(this.passengers.map(i => i.data), k => k.ptc).forEach(g => g.value.forEach((p: AirlinePassenger, idx) => {
      let passenger = this.createItem(p, idx + 1);
      originalPassengers.passengers.push(passenger.value);
      this.passengersFormArr.push(passenger);
    }));

    if(!environment.production && (!this.passengers[0].data.individual || !this.passengers[0].data.individual.surname)) {
      let passengers = (JSON.parse(JSON.stringify(this.dummyPassengerData)));
      passengers.passengers.splice(this.passengers.length);
      originalPassengers.passengers = passengers.passengers;
      this.passengersFormGroup.patchValue(passengers);
    }
    
    let originalPassengers$ = of(originalPassengers);
    this.passengersFormGroup.valueChanges.pipe(
      dirtyCheck(originalPassengers$),
    ).subscribe((data) => {
      this.passengerChanges.emit(data);
    });
  }   


  createItem(passenger: AirlinePassenger, idx: number): FormGroup {
    if(!passenger.individual){
      passenger.individual = {
        gender: 'MALE',
        nameTitle: 'MR',
        givenName: [''],
        middleName: [''],
        surname: '',
        birthdate: ''
      };
    }
    if(!passenger.individual.middleName){
      passenger.individual.middleName = [''];
    }
    
    return new FormGroup({
      Id: new FormControl(passenger.passengerID, Validators.required),
      Ptc: new FormControl(passenger.ptc),
      Label: new FormControl(this.passengerService.titleByPtc(passenger.ptc, idx)),
      WheelChair: new FormControl(false, Validators.required), 
      Birthdate: new FormControl(passenger.individual.birthdate, Validators.required), 
      Gender: new FormControl(passenger.individual.gender, Validators.required), 
      NameTitle: new FormControl(passenger.individual.nameTitle, Validators.required), 
      GivenName: new FormControl(passenger.individual.givenName[0], Validators.required),  
      MiddleName: new FormControl(passenger.individual.middleName[0]), 
      Surname: new FormControl(passenger.individual.surname, Validators.required),
      Country: new FormControl('', Validators.required),
      FrequentFlyerNumber: new FormControl(''),
      KnownTravelerNumber: new FormControl(''),
      RegressNumber: new FormControl('')
    });
  }
  
  markAllAsTouched() {
    this.passengersFormGroup.markAllAsTouched();
  }

  getPassengers(): Array<AirlinePassenger> {
    let result : Array<AirlinePassenger> = this.passengersFormGroup.value.passengers.map(i => {
      const date = new Date(i.Birthdate);
      let year = date.getFullYear();
      let month = date.getMonth() + 1; // js dates returns value from 0 to 11 for month
      let day = date.getDate();
      
      const birthdate =  year + "-" + (month < 10 ? "0": "") + month + "-" + (day < 10 ? "0": "") + day;
      
      let passenger: AirlinePassenger = {
        passengerID: i.Id,
        ptc: i.Ptc,
        individual: {
          gender: i.Gender,
          nameTitle: i.NameTitle,
          surname: i.Surname,
          givenName: [i.GivenName],
          birthdate: birthdate,
          middleName: i.MiddleName? [i.MiddleName] : []
        },
        contactInfoRef: ''
      };
      return passenger;
    });
    
    return result; 
  }

  capitalizeFirstLetter(text: string): string {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  public dummyPassengerData = {
    "passengers": [
      {
        "Index": 1,
        "WheelChair": false,
        "Birthdate": new Date("2007-07-03T18:30:00.000Z"),
        "Gender": "MALE",
        "NameTitle": "MR",
        "GivenName": "Sai",
        "MiddleName": "Reddy",
        "Surname": "Gudimetla",
        "Country": "United States",
        "FrequentFlyerNumber": "",
        "KnownTravelerNumber": "",
        "RegressNumber": ""
      },
      {
        "Index": 2,
        "WheelChair": false,
        "Birthdate": new Date("1985-07-03T18:30:00.000Z"),
        "Gender": "MALE",
        "NameTitle": "MR",
        "GivenName": "Surya",
        "MiddleName": "Mohan",
        "Surname": "Gudimetla",
        "Country": "United States",
        "FrequentFlyerNumber": "",
        "KnownTravelerNumber": "",
        "RegressNumber": ""
      },
      {
        "Index": 3,
        "WheelChair": false,
        "Birthdate": new Date("2014-07-03T18:30:00.000Z"),
        "Gender": "MALE",
        "NameTitle": "MR",
        "GivenName": "Bob",
        "MiddleName": "",
        "Surname": "Smith",
        "Country": "United States",
        "FrequentFlyerNumber": "",
        "KnownTravelerNumber": "",
        "RegressNumber": ""
      },
      {
        "Index": 4,
        "WheelChair": false,
        "Birthdate": new Date("2021-07-03T18:30:00.000Z"),
        "Gender": "MALE",
        "NameTitle": "MR",
        "GivenName": "Jane",
        "MiddleName": "",
        "Surname": "Smith",
        "Country": "United States",
        "FrequentFlyerNumber": "",
        "KnownTravelerNumber": "",
        "RegressNumber": ""
      },
      {
        "Index": 5,
        "WheelChair": false,
        "Birthdate": new Date("2001-07-03T18:30:00.000Z"),
        "Gender": "MALE",
        "NameTitle": "MR",
        "GivenName": "Mahidhar",
        "MiddleName": "",
        "Surname": "Reddy",
        "Country": "United States",
        "FrequentFlyerNumber": "",
        "KnownTravelerNumber": "",
        "RegressNumber": ""
      },
      {
        "Index": 6,
        "WheelChair": false,
        "Birthdate": new Date("2007-07-03T18:30:00.000Z"),
        "Gender": "MALE",
        "NameTitle": "MR",
        "GivenName": "Nithya",
        "MiddleName": "",
        "Surname": "Venkatesan",
        "Country": "United States",
        "FrequentFlyerNumber": "",
        "KnownTravelerNumber": "",
        "RegressNumber": ""
      }
    ]
  }
}
