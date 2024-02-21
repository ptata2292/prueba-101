import { ObjectBase } from '../../../core/object-base';
import { LoginService } from '../auth/login/login.service';
import { getTenantModule } from '../../../shared/tenant/tenant';


export class Airline extends ObjectBase {

  constructor(loginService: LoginService) {
    super(loginService);

  } 

  public getImageName(airlineID) {
    let imagePath = "assets/media/Airlines/" + airlineID + ".png";
    // console.log('airlineID:' + airlineID);
    return imagePath;
  }

  public onImgError(event) {
    // console.log(event);
    event.target.src = "assets/media/Airlines/noImage2.png";
  }

  getOperatedCarrierText(airlineID, airlineName) {
    let carrierAirlineIDs = getTenantModule().airline.carrierAirlineID || ["AA" ];
    if(carrierAirlineIDs.includes(airlineID)) {
      return airlineName;
    } else {
      return "Operated by " + airlineName;
    }
  }

  nonZero(num) {
    return false && num != null && num !='0';
  }

  setLoyaltyProgramPassenger(passenger, FrequentFlyerNumber) {
    if(!this.isNullOrWhiteSpace(FrequentFlyerNumber)) {
      passenger.loyaltyProgramAccount = [
        {
            "airline": {
                "airlineDesignator": "AA"
            },
            "accountNumber": FrequentFlyerNumber
        }
      ]
    }
    return passenger;
  }
}
