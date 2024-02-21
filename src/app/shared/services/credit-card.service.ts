import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor() { }

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
  
  // TEST credit cards detals:
  // https://farelogixpartnersupport.zendesk.com/hc/en-us/articles/4402363072269-Test-Credit-Cards-for-Sandbox
  // expired: 01/39 Transaction approved (code 0)
  // expired: 02/23 Transaction could not be processed (code 1)
  // expired: 05/22 Transaction declined - contact issuing bank (code 2)
  // expired: 08/28 No reply from Processing Host (code 3)
  // expired: 04/27 Card has expired (code 4)
  // expired: 01/27 Insufficient credit (code 5)
  public dummyCreditCardData = {
    City: "Miami",
    CountryCode: "US",
    CreditCardNumber: "30123400000000", 
    CreditType: "DC",
    ExpMonth: "01",
    ExpYear: 2039,
    FirstNameonCard: "John",
    LastNameonCard: "Brown",
    PostalCode: "33160",
    SecurityCode: "100",
    State: "FL",
    Street: "123 Street Building"
  };

  findNameByCode(code){
    let cardTypeObj = this.cardTypes.find(i => i.code == code);
    return cardTypeObj ? cardTypeObj.name : code;
  }
}
