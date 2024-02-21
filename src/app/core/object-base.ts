import { ElementRef } from '@angular/core';
import { config } from '../shared/config';
import { LoginService } from '../views/pages/auth/login/login.service';
import { security } from './security';
import { securityCode } from './security.model';


export class ObjectBase extends security {
  public snackBarDuration = 2000;
  public endDateDivs = ['endDiv', 'endDate', 'endDateDiv', 'endViewTitle', 'endOneDate', 'endRoundDay', 'endDay', 'endDate'];
  public startDateDivs = ['startDiv', 'startDate', 'startSingleDateDiv', 'startRoundDateDiv','startViewTitle', 'startViewDate', 'startViewDay'];
  public excludeDateClasses = ["next available", "calendar-table", "drp-calendar"];
  public excludeDateNodes = ["TABLE", "TH", "TD ", "TBODY", "THEAD", "SPAN"];
  public cardTypes = [
    {
      "name": "American Express",
      "code": "AX"
    },
    {
      "name": "Diners Club International",
      "code": "DC"
    },
    {
      "name": "Discover Card",
      "code": "DS"
    },
    {
      "name": "Japan Credit Bureau",
      "code": "JC"
    },
    {
      "name": "Mastercard",
      "code": "CA"
    },
    {
      "name": "UATP",
      "code": "TP"
    },
    {
      "name": "Visa",
      "code": "VI"
    }
  ];
  
  constructor(loginService: LoginService){
    super(loginService)
  }

  clickWithDiv(event: any, divElementRef: ElementRef, divIds: string[]) {
    // console.log((divIds.includes(event.target.id) || divElementRef.nativeElement.contains(event.target)));
    return (divIds.includes(event.target.id) || divElementRef.nativeElement.contains(event.target));
  }

  clickWithDivClass(event: any, divElementRef: ElementRef, divIds: string[], excludeDivClasses: string[]) {
    let isMatch = (divIds.includes(event.target.id) || divElementRef.nativeElement.contains(event.target));
    let isExclude = !(excludeDivClasses.length == 0 ? true :  (excludeDivClasses.filter((divClass) => event.target.className.indexOf(divClass) != -1).length > 0));
    // console.log('isMatch:' + isMatch + ' ,isExclude:' +  isExclude + ' ,response:' +  (isMatch || isExclude));
    return (isMatch || isExclude);
 }

  checkIfClassNameExists(event, classNames) {
    return classNames.length == 0 ? true :  (classNames.filter((className) => event.target.className.indexOf(className) != -1).length > 0);
  }

  checkIfNodeNameExists(event, nodeNames) {
    return nodeNames.length == 0 ? true :  (nodeNames.filter((nodeName) => event.target.nodeName.indexOf(nodeName) != -1).length > 0);
  }

  formatPhoneNumber(tel) {
    var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "+1";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + "(" + city + ")" + number).trim();
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  isNullOrWhiteSpace(str) {
    if (str != undefined && str != null)
        str = str.toString();
    else
        str = "";
    return str.trim().length == 0;
  }
}
