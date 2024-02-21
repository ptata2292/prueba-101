import { FormGroup } from '@angular/forms';

import { config } from '../../../shared/config';
import { ObjectBase } from '../../../core/object-base';
import { LoginService } from '../auth/login/login.service';
import { from } from 'rxjs';

export class Cruise extends ObjectBase {

  protected defaultTo =  {
    "id": "ORD",
    "icao": "KORD",
    "iata": "ORD",
    "name": "ORD - Chicago OHare International Airport",
    "city": "Chicago",
    "state": "Illinois",
    "country": "US",
    "elevation": 672,
    "lat": 41.97859955,
    "lon": -87.90480042,
    "tz": "America/Chicago",
    "value":"ORD - Chicago OHare International Airport",
    "data":"ORD"
  };
  protected defaultFrom =   {
    "id": "DFW",
    "icao": "KDFW",
    "iata": "DFW",
    "name": "DFW - Dallas Fort Worth International Airport",
    "city": "Dallas-Fort Worth",
    "state": "Texas",
    "country": "US",
    "elevation": 607,
    "lat": 32.89680099,
    "lon": -97.03800201,
    "tz": "America/Chicago",
    "value":"DFW - Dallas Fort Worth International Airport",
    "data":"DFW"
  };
  public numbers  = [1,2,3,4,5,6,7,8,9,10];
  public wholeNumbers  = [0,1,2,3,4,5,6,7,8,9,10];

  public countries = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mcdonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis"];
  public gender = ["Male", "Female"];
  public paymentTypes = ["On Hold", "Credit Card"];
  public yearArray = Array(10).fill(null).map((_, i) => new Date().getFullYear() + i);
  public monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  constructor(loginService: LoginService) {
    super(loginService);
  } 

  public getAirPortDisplayName(suggestion) {
    const value = suggestion.value || suggestion.name ||'';
    const data = suggestion.data || suggestion.id ||'';
    if(value == '' && data == '') {
      return 'Please Select'; 
    } else {
      const AirPortDisplayName =  value + '(' + data + ')'
      return AirPortDisplayName;
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
    if(formGroupValue.to != '' && (formGroupValue.to.data == null && formGroupValue.to.id == null)) {
      return { toSelected: true};
    }
    return null;
  }

  fromSelected(form: FormGroup) {
    const formGroupValue = form.value;
    if(formGroupValue.from != '' && (formGroupValue.from.data == null && formGroupValue.from.id == null)) {
      return { fromSelected: true};
    }
    return null;
  }
  
  displayFn(airport): string {
    return airport && airport.data ? airport.data : (airport && airport.name ? airport.name : '');
  }

  getFare(flightFares) {
    let fare = flightFares[0].totalPrice;
    for(let flightFare of flightFares) {
      if(flightFare.selectedFare == true) {
        return flightFare.totalPrice
      }
      if(flightFare.totalPrice < fare){
        fare = flightFare.totalPrice;
      }
    }
    return fare;
  }

  getFares(flightFares) {
    let amount = {
      fareAmount : 0,  
      baseAmount : 0,
      facilityCharge : 0,
      securityServiceFee : 0
    } 

    amount.fareAmount = flightFares[0].totalPrice;
    amount = this.getTaxes(flightFares[0], amount);
    for(let flightFare of flightFares) {
      if(flightFare.selectedFare == true) {
        amount = this.getTaxes(flightFares[0], amount);
        amount.fareAmount =flightFare.totalPrice
        return amount;
      }
      if(flightFare.totalPrice < amount.fareAmount){
        amount = this.getTaxes(flightFares[0], amount);
        amount.fareAmount = flightFare.totalPrice;
      }
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

  public getImageName(cruiseID) {
    let imagePath = "assets/media/Cruises/" + cruiseID + ".png";
    // console.log('cruiseID:' + cruiseID);
    return imagePath;
  }

  public onImgError(event) {
    // console.log(event);
    event.target.src = "assets/media/Cruises/noImage2.png";
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
