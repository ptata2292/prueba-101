import { Injectable } from '@angular/core';
import { concat, Observable, of, zip } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { AirlinePassenger } from '../models/passenger/airline-passenger';
import { AirlineOrderViewModel } from '../viewmodels/airline-order';
import { AirlinePassengerSummaryViewModel } from '../viewmodels/airline-passenger';
import { AirlinePtc, AirlinePtcCount } from '../viewmodels/airline-ptc';
import { AirlineSearch } from '../viewmodels/airline-search';
import { AirlineRetrieveService } from './airline-retrieve.service';

@Injectable({
  providedIn: 'root'
})

export class AirlinePassengerService {

  private empty: string = "NA";

  private supportedPtcs: Array<AirlinePtc> = [{
    ptcCode: "ADT",
    ageFrom: 16,
    ageTo: 64,
    title: "Adult"
  }, {
    ptcCode: "CNN",
    ageFrom: 2,
    ageTo: 15,
    title: "Child"
  }, {
    ptcCode: "INS",
    ageFrom: null,
    ageTo: 2,
    title: "Infant"
  }, {
    ptcCode: "SRC",
    ageFrom: 65,
    ageTo: null,
    title: "Senior"
  }]

  constructor(private airlineRetrieveService: AirlineRetrieveService) { }

  diffAndSaveChanges(orderID: string, orderViewModel: AirlineOrderViewModel) {
    let newPassengers = orderViewModel.changedPassengerList.passenger;
    let namePassengerServicing = [];
    let otherPassengerServicing = [];

    let oldPassengers = orderViewModel.passengers;
    newPassengers.forEach(p => {
      let newPassenger = p;
      let oldPassenger = oldPassengers.find(i => i.data.passengerID == newPassenger.passengerID).data;

      this.updatePassengerBeforeSending(newPassenger);
      this.updatePassengerBeforeSending(oldPassenger);
      if(oldPassenger.individual.givenName != newPassenger.individual.givenName || oldPassenger.individual.middleName != newPassenger.individual.middleName || 
        oldPassenger.individual.nameTitle != newPassenger.individual.nameTitle || oldPassenger.individual.surname != newPassenger.individual.surname){
          namePassengerServicing.push({
            new: {
              passengerID: newPassenger.passengerID,
              individual: {
                nameTitle: newPassenger.individual.nameTitle,
                givenName: newPassenger.individual.givenName,
                middleName: newPassenger.individual.middleName,
                surname: newPassenger.individual.surname
              },
              actionType: "name"
            },
            previous: {
              passengerID: oldPassenger.passengerID,
              individual: {
                nameTitle: oldPassenger.individual.nameTitle,
                givenName: oldPassenger.individual.givenName,
                middleName: oldPassenger.individual.middleName,
                surname: oldPassenger.individual.surname
              },
              actionType: "name"
            }
          });
        }
        if(oldPassenger.individual.birthdate != newPassenger.individual.birthdate || oldPassenger.individual.gender != newPassenger.individual.gender){
          otherPassengerServicing.push({
            new: {
              passengerID: newPassenger.passengerID,
              individual: {
                surname: newPassenger.individual.surname,
                gender: newPassenger.individual.gender,
                birthdate: newPassenger.individual.birthdate
              },
              actionType: "other"
            },
            previous: { 
              passengerID: oldPassenger.passengerID,
              individual: {
                surname: newPassenger.individual.surname,
                gender: oldPassenger.individual.gender,
                birthdate: oldPassenger.individual.birthdate
              },
              actionType: "other"
            }
          });
        }
    });

    let changeNamesQuery = {
      query: {
        orderID: orderID,
        passengerServicing: namePassengerServicing
      }
    }
    
    let otherChangeQuery = {
      query: {
        orderID: orderID,
        passengerServicing: otherPassengerServicing
      }
    }
    if(namePassengerServicing.length && otherPassengerServicing.length){
      return concat(this.airlineRetrieveService.orderChange(changeNamesQuery, "Changing passenger details...", true), this.airlineRetrieveService.orderChange(otherChangeQuery, "Changing passenger details...", true));  
    }
    else if(namePassengerServicing.length){
      return this.airlineRetrieveService.orderChange(changeNamesQuery, "Changing passenger details...", true);
    }
    else if (otherPassengerServicing.length){
      return this.airlineRetrieveService.orderChange(otherChangeQuery, "Changing passenger details...", true);
    }
    else{
      return of(null);
    }
  }


  getSupportedPtcs(): string[] {
    return this.supportedPtcs.map(i => i.ptcCode);
  }
 
  getAdult(): AirlinePtc { 
    let adult = this.supportedPtcs.find(i => i.ptcCode == "ADT");
    let copy = JSON.parse(JSON.stringify(adult));
    return copy;
  }
  
  titleByPtc(ptcCode: string, index: number) {
    let title = this.supportedPtcs.find(i => i.ptcCode == ptcCode).title;
    if(index){
      title += "-" + index;
    }
    return title;
  }

  getPassengerLabel(passenger: AirlinePassenger): string {
    return passenger.passengerID;
  } 

  getPtcLabel(ptcCode: string): string{
    let ptc = this.supportedPtcs.find(i => i.ptcCode == ptcCode);
    let label = ptc.title;
    if(ptc.ageTo && ptc.ageFrom){
      label += ` (${ptc.ageFrom}-${ptc.ageTo})`;
    }

    if(ptc.ageFrom && !ptc.ageTo){
      label += ` (${ptc.ageFrom}+)`;
    }
    
    if(!ptc.ageFrom && ptc.ageTo){
      label += ` (under ${ptc.ageTo})`;
    }
    return label;
  }

  getTotal(ptcCount: AirlinePtcCount){
    let total = 0;
    this.supportedPtcs.forEach(ptc => {
      total += ptcCount.ptcCount[ptc.ptcCode] ?? 0;
    })
    return total;
  }

  updatePassengerAfterReceiving(p: AirlinePassenger){
    if(p.individual.middleName && p.individual.middleName.length && p.individual.middleName[0] == this.empty){
      p.individual.middleName = [""];
    }
  }

  updatePassengerBeforeSending(p: AirlinePassenger){
    if(p.contactInfoRef){
      p.contactInfoRef = ((<any>p.contactInfoRef).contactID || p.contactInfoRef)
    }

    if(p.individual.middleName && (!p.individual.middleName.length || (p.individual.middleName.length === 1 && p.individual.middleName[0].trim() === ""))){
      p.individual.middleName = [this.empty]
    }
  }

  setLoyaltyProgramPassengers(passengers, airlineSearch: AirlineSearch) {
    if(!(airlineSearch.loyaltyAccountNumber) && airlineSearch.isLoyaltyAccountEnabled) {
      passengers.forEach(passenger => {
        passenger.loyaltyProgramAccount = [
          {
              "airline": {
                  "airlineDesignator": "AA"
              },
              "accountNumber": airlineSearch.loyaltyAccountNumber
          }]
      }); 
    } else {
      passengers.forEach(passenger => {
        delete passenger.loyaltyProgramAccount;
      });
    }
    return passengers;
  }

}