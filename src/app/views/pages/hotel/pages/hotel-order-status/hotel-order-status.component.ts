import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelRetrieveService } from '../../services/hotel-retrieve.service';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Hotel } from '../../hotel';
import { HotelOrderService } from '../../services/hotel-order.service';

@Component({
  selector: 'app-hotel-order-status',
  templateUrl: './hotel-order-status.component.html',
  styleUrls: ['./hotel-order-status.component.css']
})
export class HotelOrderStatusComponent extends Hotel implements OnInit {

  public isSubmitted = false;
  public isLoading = false;
  public orderResponse = {
    "payloadStdAttributes": {
      "timeStamp": "2020-11-02 10:27 AM UTC",
      "targetName": "Test",
      "version": 5.0,
      "transactionIdentifier": "f186d848-e756-4f8a-abc4-e0db37c2f39b",
      "transactionStatusCode": "END"
    },
    "result": {
      "errors": [],
      "warnings": [],
      "status": {
          "value": "COMPLETE"
      }
    },
    "order": {
      "offer": [],
      "primaryTraveler": {
          "personName": {
              "prefix": [],
              "given": [
              ],
              "middle": [],
              "surname": "",
              "suffix": [],
              "title": []
          },
          "address": [],
          "telephone": [],
          "email": []
      },
      "payment": [],
      "confirmationID": {
          "value": ""
      },
      "extensionPoint": {
          "any": []
      },
      "objID": ""
    }
  };
  public orderId;
  public surname;
  public chainCode;
  public flightSegmentList = [];
  public hotelInfo;

  displayedColumns: string[] = ['Item', 'Description', 'Guests'];

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
    private hotelOrderService: HotelOrderService, private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, private hotelRetrieveService:HotelRetrieveService) {
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
      this.surname = params.surname;
      this.chainCode = params.chainCode;
      //this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    if(this.orderId != null && this.surname != null && this.chainCode != null){
      let query = {
        confirmationId: this.orderId,
        surname: this.surname,
        chainCode: this.chainCode
      }
      this.hotelOrderService.getOrderById(query).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.orderResponse = data.createOrderRS[0];//this.getOrderData(data, this.order);
        if(this.orderResponse.result.errors.length == 0 && this.orderResponse.result.status.value == 'COMPLETE'){
          this.getHotelInfo();
        } else {
          this.isLoading = false;
        }
      });
    }
  }

  async getHotelInfo(){
    let query = {
      chainCode: this.orderResponse.order.offer[0].facilityIdentifier.facilityKey.chainCode,
      brandCode: '',
      code: this.orderResponse.order.offer[0].facilityIdentifier.facilityKey.facilityCode
    };
    this.hotelInfo = await this.hotelRetrieveService.getHotelDescription(query);
    // let multiMediaArray = this.hotelInfo && this.hotelInfo.multimediaCollection && this.hotelInfo.multimediaCollection.multimedia;
    // for(let multiMedia of multiMediaArray){
    //   if(multiMedia.imageCategory && multiMedia.imageCategory.image && multiMedia.imageCategory.image.length > 0){
    //     hotelImageURL = multiMedia.imageCategory.image[0].url;
    //   }
    // }
    this.hotelInfo["hotelImageURL"] = await this.hotelRetrieveService.getHotelImage(query.chainCode, query.code);
    this.isLoading = false;
  }
}
