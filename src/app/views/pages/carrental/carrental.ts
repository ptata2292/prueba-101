import { FormGroup } from '@angular/forms';

import { config } from '../../../shared/config';
import { ObjectBase } from '../../../core/object-base';
import { LoginService } from '../auth/login/login.service';
import { from } from 'rxjs';

export class Carrental extends ObjectBase {

  protected defaultTo =  {
  };
  protected defaultFrom =   {
  };
  public numbers  = [1,2,3,4,5,6,7,8,9,10];
  public wholeNumbers  = [0,1,2,3,4,5,6,7,8,9,10];
  public timings = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  public defaultTimings = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  public pickupTimings = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  public dropoffTimings = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  
  public countries = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mcdonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis"];
  public gender = ["Male", "Female"];
  public paymentTypes = ["On Hold", "Credit Card"];
  public yearArray = Array(10).fill(null).map((_, i) => new Date().getFullYear() + i);
  public monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  public days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(loginService: LoginService) {
    super(loginService);
  }

  public getValidPickupTime(pickupDate, selectedLocation) {
    this.pickupTimings = this.defaultTimings;
    if(selectedLocation == '') {
      return this.pickupTimings;
    } else {
      let day = this.days[ new Date(pickupDate).getDay() ];
      let workingHours = selectedLocation.hours;
      for (let hours of workingHours) {
        console.log(hours);
      }
      return this.pickupTimings;
    }
  }

  public getCarLocationDisplayName(suggestion) {
    const value = suggestion.value || suggestion.name ||'';
    const data = suggestion.data || suggestion.id ||'';
    if(value == '' && data == '') {
      return 'Please Select'; 
    } else {
      const LocationDisplayName =  value;
      return LocationDisplayName;
    }
  }

  sameToFromValidator(form: FormGroup) {
    if((form.value.from || {}).data != null && (form.value.to || {}).data != null) {
      const condition = form.value.from.data == form.value.to.data;
      return condition ? { toFromMatch: true} : null;
    }
    return null;
  }

  sameStartEndValidator(form: FormGroup) {
    const start = form.value.start;
    const end = form.value.end;
    if( start != null && end != null) {
      const condition = new Date(start).getTime() > new Date(end).getTime();
      return condition ? { startEndMatch: true} : null;
    }
    return null;
  }

  toSelected(form: FormGroup) {
    const formGroupValue = form.value;
    if(formGroupValue.to != '' && (formGroupValue.to.name == undefined)) {
      return { toSelected: true};
    }
    return null;
  }

  fromSelected(form: FormGroup) {
    const formGroupValue = form.value;
    if(formGroupValue.from != '' && (formGroupValue.from.name == undefined)) {
      return { fromSelected: true};
    }
    return null;
  }
  
  displayFn(airport): string {
    return airport && airport.data ? airport.data : (airport && airport.name ? airport.name : '');
  }

  getFare(carFares) {
    let amount = {
      totalCarCharges : 0,  
      totalTaxes : 0,
      totalFees : 0,
      totalAmount : 0
    } 
    amount.totalAmount = carFares.total.value;
    for(let carFare of carFares.productPrice){
      amount.totalCarCharges = amount.totalCarCharges + carFare.price.total.value;
      amount.totalTaxes = amount.totalAmount - amount.totalCarCharges;
    }
    return amount;
  }

  getTotalFares(carFares) {
    let amount = {
      totalCarCharges : 0,  
      totalTaxes : 0,
      totalFees : 0,
      totalAmount : 0
    } 
    amount.totalAmount = carFares.total.value;
    for(let carFare of carFares.productPrice){
      for(let fee of carFare.fee){
        amount.totalFees = amount.totalFees + fee.price.total.value;
      }
      for(let tax of carFare.taxes.tax){
        amount.totalTaxes = amount.totalTaxes + tax.amount.total.value;
      }
      amount.totalCarCharges = amount.totalCarCharges + carFare.price.total.value;
    }
    return amount;
  }

  getTaxes(flightFare, amount){
    amount.baseAmount = flightFare.baseAmount;
    amount.facilityCharge = 0;
    amount.securityServiceFee = 0;
    for(let tax of flightFare.tax) {
      if(tax.description == 'U.S Passenger Facility Charge') {
        amount.facilityCharge = amount.facilityCharge +  (Number(tax.amount.text) * 0.01);
      } else if (tax.description == 'Passenger Civil Aviation Security Service Fee') {
        amount.securityServiceFee = amount.securityServiceFee +  (Number(tax.amount.text) * 0.01);
      }
    }
    return amount;
  }

  getOrderData(data, order) {
    if(data != null && data.response != null && data.response.dataLists != null) {
      if(data.response.dataLists.flightSegmentList != null && data.response.dataLists.flightSegmentList.flightSegment != null) {
        order.flightSegment = data.response.dataLists.flightSegmentList.flightSegment || [] ;
      }
      if(data.response.dataLists.passengerList != null && data.response.dataLists.passengerList.passenger != null) {
        order.passengerList = data.response.dataLists.passengerList.passenger || [] ;
        let index = 1;
        for(let passenger of order.passengerList){
          passenger.index = index++;
        }
      }
      if(data.response.dataLists.contactList != null && data.response.dataLists.contactList.contactInformation != null 
              && data.response.dataLists.contactList.contactInformation.contactProvided!= null) {
        order.contactList = data.response.dataLists.contactList.contactInformation.contactProvided || [] ;
      }
    } 
    order.OrderID =  order.OrderID || ((data.response || {}).order || {}).orderID || 'NA';
    let travelAgencyRecipient = (((data.party || {}).recipient || {}).travelAgencyRecipient || {})
    order.Agency =  order.Agency || (travelAgencyRecipient.agentUser || {}).agentUserID || 'NA';
    order.AgencyId =  order.AgencyId || travelAgencyRecipient.agencyID || 'NA';
    return order;
  }

  getDuration(flightDuration) {
    // const flightDurationStr =  `${flightDuration.substring(2,5)} ${flightDuration.substring(5)}`;
    const flightDurationStr = flightDuration.replace("PT","");
    return flightDurationStr;
  }
  getStops(stops) {
    const stopsStr =  stops == 0 ? "Nonstop" : `${stops} Stop(s)`;
    return stopsStr;
  }

  getClass(code){
    return code == 'I' ? 'Economy' : 'First Class';
  }

  getName(passenger){
    const name =
    (passenger.individual.nameTitle || "") + " " + 
    (passenger.individual.givenName || "") + " " + 
    (passenger.individual.middleName || "") + " " + 
    (passenger.individual.surname || "");
    return name;
  }

  public getImageName(carrentalID) {
    let imagePath = "assets/media/Carrentals/" + carrentalID + ".png";
    // console.log('carrentalID:' + carrentalID);
    return imagePath;
  }

  public onImgError(event) {
    // console.log(event);
    event.target.src = "assets/media/Carrentals/noImage2.png";
  }

  getNameOnly(passenger){
    const name =
    (passenger.individual.givenName || "") + " " + 
    (passenger.individual.middleName || "") + " " + 
    (passenger.individual.surname || "");
    return name;
  }

  public changeOrderData(orderObj) {
    let date,airportCode;
    if(orderObj != null && orderObj.flightSegment != null 
        && orderObj.flightSegment[0] != null && orderObj.flightSegment[0].departure != null ) {
          date = orderObj.flightSegment[0].departure.date;
          airportCode = orderObj.flightSegment[0].departure.airportCode;
    }
    let order = {
      OrderId : orderObj.orderID|| orderObj.OrderID,
      PassengerName : this.getNameOnly(orderObj.passengerList[0]) || 'NA',
      Depature :  date || 'NA',
      Airport : airportCode || 'NA',
      Creation : orderObj.creationDate || 'NA',
      Agency : orderObj.Agency ||(orderObj.agency||{}).name || 'NA',
      AgencyId : orderObj.AgencyId ||((orderObj.agency||{}).agencyID||{}).text  || 'NA'
    }
    orderObj = {
      ...orderObj,
      ...order
    }
    return orderObj;
  }
}
