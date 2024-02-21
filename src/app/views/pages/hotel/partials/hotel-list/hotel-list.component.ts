import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { collapseAnimation } from 'src/app/animations';
import { trip } from 'src/app/shared/models/carrental.model';
import { ArrayHelperService } from 'src/app/shared/services/array-helper.service';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { getTenantModule } from 'src/app/shared/tenant/tenant';
import { LoginService } from 'src/app/views/pages/auth/login/login.service';
import { HotelData } from '../../data/hotel-data';
import { Offer } from '../../data/hotel-offer';
import { Hotel } from '../../hotel';
import { ExtraFeesService } from '../../services/extra-fees.service';
import { HotelRetrieveService } from '../../services/hotel-retrieve.service';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  animations: [
    collapseAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HotelListComponent extends Hotel implements OnInit, AfterViewInit, OnDestroy {
  //public selectedHotels;
  public props;
  //public isLoading = true;
  private searchSubscription: Subscription;
  public radioSelected: trip = "one";
  private hotelOfferQuery = {
    "basicPropertyInfo": [
    ],
    "baseHospitalityFacilityQuery": {
      "dateTimeSpan": {
        "start": "",
        "end": ""
      },
      "guestCount": [
      ],
      "numberOfRooms": 1
    }
  }
  public errorMessage = '';

  public hotelList: HotelList = new HotelList();
  private lastUpdateSize = 0;
  private skipCount = 0;
  private batchSize = 5;
  private hotelNamesList = [];
  private hotelSearchFormGroup;
  private isLoadNext = false;

  @Input() search: Observable<any>;
  @Input() isLoading:boolean;
  @Input() isHotelListFetching:boolean;
  @Output() isLoadingChange: EventEmitter<boolean> = new EventEmitter();
  @Output() isHotelListFetchingChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private hotelRetrieveService: HotelRetrieveService, private router: Router,
    private arrayHelperService: ArrayHelperService,
    loginService: LoginService, private localStorage: LocalStorage, private extraFeeService: ExtraFeesService) {
    super(loginService);
  }

  ngOnInit() {
    let tenantConfig = getTenantModule();
    this.batchSize = tenantConfig.hotel && tenantConfig.hotel.batchSize ? tenantConfig.hotel.batchSize: this.batchSize;
    //this.selectedHotels = window.history.state.hotelList;
    this.searchSubscription = this.search.subscribe((searchList) => {
      if (searchList.selectedHotelList != null && searchList.selectedHotelList.length > 0) {
        this.isLoading = true;
        this.isLoadNext = false;
        this.hotelNamesList = searchList.selectedHotelList || [];
        this.hotelSearchFormGroup = searchList.searchForm;
        this.loadInitPost(true);
        //this.searchHotels();
      }
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onScroll() {
    //console.log('onScroll');
    if (this.hotelList.notscrolly && this.hotelList.notEmptyPost && this.hotelList.hotels.length !== 0) {
      this.hotelList.spinner = true;
      this.hotelList.notscrolly = false;
      this.loadNextPost();
    }
  }

  public extraFeeCalculateTotal(hotelData : HotelData, offer: Offer){
    return this.extraFeeService.calculateTotal(hotelData, offer);
  }

  clearData(hotelList: HotelList) {
    hotelList.hotels = [];
    hotelList.notEmptyPost = true;
    hotelList.notscrolly = true;
    hotelList.spinner = false;
    hotelList.retrieveFrom = null;
  }

  loadInitPost(resetSkipCount = false) {
    resetSkipCount ? this.skipCount = 0 : null;
    this.clearData(this.hotelList);
    this.searchHotels();
  }

  loadNextPost() {
    this.searchHotels(true);
  }

  searchHotels(loadNextPost = false) {
    if(!loadNextPost){
      this.lastUpdateSize = 0;
    }

    this.getHotelOffersQuery();
    this.errorMessage = '';
    if(this.hotelOfferQuery.basicPropertyInfo.length > 0) {
      this.getHotelFares(loadNextPost);
    } else{
      this.hotelList.spinner = false;
      this.hotelList.notscrolly = true;
      this.isLoading = false;
    }
  }

    private async getHotelRoomInfo(hotelFareData, loadNextPost) {
    let response = [];
    if (hotelFareData.offers != null && hotelFareData.offers.length > 0) {
      response = await this.getHotelData(hotelFareData, loadNextPost);
    } else if (hotelFareData.extensionPoint != null && hotelFareData.extensionPoint.any
      && hotelFareData.extensionPoint.any.length > 0) {
      if (hotelFareData.offers != null && hotelFareData.offers.length == 0) {
        if(this.hotelList.hotels.length == 0){
          if (loadNextPost) {
            this.hotelList.notEmptyPost = false;
          }
          this.isHotelListFetchingChange.emit(false);
          this.errorMessage = 'No rooms available for your criteria. Please try again.';//hotelFareData.extensionPoint.any[0].errors[0].notifications[0].message;
        }
      } else {
        if(this.hotelList.hotels.length == 0){
          if (loadNextPost) {
            this.hotelList.notEmptyPost = false;
          }
          this.isHotelListFetchingChange.emit(false);
          this.errorMessage = 'No rooms available for your criteria. Please try again.';//hotelFareData.extensionPoint.any[0].errors[0].shortText || hotelFareData.extensionPoint.any[0].errors[0].value ;
        }
      }
    } else {
      if (hotelFareData.offers != null && hotelFareData.offers.length == 0) {
        if(this.hotelList.hotels.length == 0){
          if (loadNextPost) {
            this.hotelList.notEmptyPost = false;
          }
          this.isHotelListFetchingChange.emit(false);
          this.errorMessage = 'No rooms available for your criteria. Please try again.';
        }
      }
      console.log('response is not correct format');
    }
    return response;
  }

  private getHotelFares(loadNextPost) {
    this.isHotelListFetchingChange.emit(true);
    this.hotelRetrieveService.getHotelFare(this.hotelOfferQuery).pipe(concatMap(hotelData => { return this.getHotelRoomInfo(hotelData, loadNextPost) })).subscribe((hotelFareData: any) => {
      if(loadNextPost){
        this.hotelList.spinner = false;
        this.hotelList.notscrolly = true;
      }
      if(this.isLoadNext || hotelFareData.length <= this.batchSize){
        this.skipCount = this.skipCount + this.batchSize;
        this.hotelList.hotels.push(...hotelFareData);
        this.lastUpdateSize += hotelFareData.length;
      }
      if((this.hotelList.hotels.length < this.batchSize || hotelFareData.length == 0 || this.lastUpdateSize < this.batchSize/2) && this.skipCount<this.hotelNamesList.length) {
        this.loadNextPost();
      } else if(this.hotelList.hotels.length < this.batchSize && this.skipCount>this.hotelNamesList.length) {
        this.hotelList.spinner = false;
        this.hotelList.notscrolly = true;
        this.isLoading = false;
        this.lastUpdateSize = 0;
        this.isLoadingChange.emit(this.isLoading);
      } else {
        this.lastUpdateSize = 0;
        this.isLoadNext = true;
        this.isLoading = false;
        this.isLoadingChange.emit(this.isLoading);
      }
      this.isHotelListFetchingChange.emit(false);
      // console.log(hotelFareData);
    }, error => {
      this.isHotelListFetchingChange.emit(false);
      this.isLoading = false;
      console.log(error);
      if (error.Error.extensionPoint) {
        this.errorMessage = 'No rooms available for your criteria. Please try again.';//error.Error.extensionPoint.any[0].errors[0].notifications[0].message;
      } else {
        this.errorMessage = 'No rooms available for your criteria. Please try again.';
      }
    });
  }

  public getHotelOffersQuery() {
    this.hotelOfferQuery.baseHospitalityFacilityQuery.guestCount = [];
    this.hotelOfferQuery.basicPropertyInfo = [];
    let guestCount = {
      "ageQualifyingCode": "",
      "value": ""
    };
    let i = 0;
    for (let index = this.skipCount; index < this.hotelNamesList.length; index++) {
      if (i < this.batchSize) {
        if (this.hotelNamesList[index].basicPropertyInfo != null) {
          this.hotelOfferQuery.basicPropertyInfo.push(this.hotelNamesList[index].basicPropertyInfo);
        }
      } else{
        break;
      }
      i = i + 1;
    }
    // for(let hotel of this.hotelNamesList || []){
    //   if(hotel.basicPropertyInfo != null){
    //     this.hotelOfferQuery.basicPropertyInfo.push(hotel.basicPropertyInfo)
    //   }
    // }
    this.hotelOfferQuery.baseHospitalityFacilityQuery.dateTimeSpan.start = typeof (this.hotelSearchFormGroup.start) == 'object' ? (this.hotelSearchFormGroup.start.toISOString()).split('T')[0] : this.hotelSearchFormGroup.start.split('T')[0];
    this.hotelOfferQuery.baseHospitalityFacilityQuery.dateTimeSpan.end = typeof (this.hotelSearchFormGroup.end) == 'object' ? (this.hotelSearchFormGroup.end.toISOString()).split('T')[0] : this.hotelSearchFormGroup.end.split('T')[0];
    if (this.hotelSearchFormGroup.adults > 0) {
      guestCount.ageQualifyingCode = "ADULT";
      guestCount.value = "" + this.hotelSearchFormGroup.count;//need to change when dropdown is done in UI
    }
    this.hotelOfferQuery.baseHospitalityFacilityQuery.guestCount.push(guestCount);
    this.hotelOfferQuery.baseHospitalityFacilityQuery.numberOfRooms = this.hotelSearchFormGroup.rooms;
  }

  public async getHotelData(hotelFareData, loadNextPost) {
    let hotelObj = {};
    let hotelList = [];
    if(!loadNextPost){
      this.hotelList.hotels = [];
    }

    let offers: Array<Offer> = hotelFareData.offers.filter(o => o.facilityIdentifier && o.facilityIdentifier.facilityKey && o.facilityIdentifier.facilityKey.facilityCode);
    let grouppedHotelFares = this.arrayHelperService.groupBy(offers, h => h.facilityIdentifier.facilityKey.facilityCode, v => v); 
    let fareHotels = grouppedHotelFares.map(g => this.hotelNamesList.filter(h => h.basicPropertyInfo).find(h => h.basicPropertyInfo.code == g.key));
    let descriptions = await this.hotelRetrieveService.getHotelDescriptions(fareHotels);
    for(let g of grouppedHotelFares){
      let hotel = this.hotelNamesList.filter(h => h.basicPropertyInfo).find(h => h.basicPropertyInfo.code == g.key);
      try {
        let rooms = this.createFinalHotelOffers(g.value);
        let hotelDetailInfo = descriptions.find(d => d.basicPropertyInfo.code == g.key);
        // let hotelImageURL = "";
        // let multiMediaArray = hotelDetailInfo && hotelDetailInfo.multimediaCollection && hotelDetailInfo.multimediaCollection.multimedia || [];
        // for (let multiMedia of multiMediaArray) {
        //   if (multiMedia.imageCategory && multiMedia.imageCategory.image && multiMedia.imageCategory.image.length > 0) {
        //     hotelImageURL = multiMedia.imageCategory.image[0].url;
        //     break;
        //   }
        // }
        hotelDetailInfo["hotelImageURL"] = await this.hotelRetrieveService.getHotelImage(hotelDetailInfo.basicPropertyInfo.chainCode, hotel.basicPropertyInfo.code);
        hotelObj = { ...hotel, rooms: rooms, ...hotelDetailInfo, showRooms: false };
        // console.log(this.isLoadNext, this.hotelList.hotels.length, this.batchSize, this.skipCount, hotelObj['basicPropertyInfo'].code);
        // if(this.isLoadNext || this.hotelList.hotels.length < this.batchSize){
        //   this.hotelList.hotels.push(hotelObj);
        // }
        hotelList.push(hotelObj);
      } catch (ex) {
        console.log(ex);
      }
    }
    //this.isLoading = false;
    return hotelList;
    //console.log(JSON.stringify(this.hotelList));
  }

  public createFinalHotelOffers(rooms) {
    let roomsArray = [];
    for (let roomObj of rooms) {
      for (let index = 0; index < roomObj.product.length; index++) {
        if (roomObj.product[index] != null && roomObj.totalPrice.productPrice[index] != null) {
          let finalRoomObj = roomObj;
          finalRoomObj.product = roomObj.product[index] || {};
          finalRoomObj.productPrice = roomObj.totalPrice.productPrice[index] || {};
          let roomName = finalRoomObj.product.roomStay.roomType.description.text.splice(0, 1);
          finalRoomObj.product.roomName = roomName[0].value;
          roomsArray.push(finalRoomObj);
        }
      }
    }
    roomsArray = roomsArray.sort((a, b) => a.productPrice.roomRate[0].rate.value - b.productPrice.roomRate[0].rate.value);
    return roomsArray;
  }

  toggleRooms(hotelObj) {
    if (hotelObj.showRooms == null) {
      hotelObj.showRooms = false;
    }
    hotelObj.showRooms = !hotelObj.showRooms;
  }

  changeCheckinCheckOut(hotelPolicies) {
    for (let hotelPolicy of hotelPolicies.hotelPolicy || []) {
      let checkInTime = this.changeTimeFormat(hotelPolicy.hotelPolicyInformation.checkInTime.split(' ')[1]);
      let checkOutTime = this.changeTimeFormat(hotelPolicy.hotelPolicyInformation.checkOutTime.split(' ')[1]);
      hotelPolicy.hotelPolicyInformation['validCheckInTime'] = checkInTime;
      hotelPolicy.hotelPolicyInformation['validCheckOutTime'] = checkOutTime;
    }
  }

  changeTimeFormat(time) {
    let timeArray = time.split(':');
    let validTime = '';
    if (timeArray[0] == 0) {
      validTime = '12:' + timeArray[1] + ' AM';
    } else if (timeArray[0] > 12) {
      validTime = (timeArray[0] - 12 > 9 ? timeArray[0] - 12 : '0' + (timeArray[0] - 12)) + ':' + timeArray[1] + ' PM';
    } else if (timeArray[0] < 12) {
      validTime = timeArray[0] + ':' + timeArray[1] + ' AM';
    } else if (timeArray[0] == 12) {
      validTime = timeArray[0] + ':' + timeArray[1] + ' PM';
    }
    return validTime;
  }

  bookNow(selectedRoom, hotel) {
    // console.log('Book Now');
    let finalSelectedRoom = {};
    finalSelectedRoom['rooms'] = [selectedRoom];
    finalSelectedRoom['hotelImageURL'] = hotel.hotelImageURL;
    finalSelectedRoom['basicPropertyInfo'] = hotel.basicPropertyInfo;
    finalSelectedRoom['contactInformation'] = hotel.contactInformation;
    finalSelectedRoom['relativePosition'] = hotel.relativePosition;
    finalSelectedRoom['extraFees'] = hotel.extraFees;
    finalSelectedRoom['dateTimeSpan'] = this.hotelOfferQuery.baseHospitalityFacilityQuery.dateTimeSpan;
    if (hotel.hotelPolicies) {
      this.changeCheckinCheckOut(hotel.hotelPolicies);
      finalSelectedRoom['hotelPolicies'] = hotel.hotelPolicies;
    }
    this.localStorage.setItem('selectedRoom', JSON.stringify(finalSelectedRoom));
    this.router.navigateByUrl('/Hotels/Booking');
  }
}

class HotelList {
  public hotels: any[];
  public notEmptyPost;
  public notscrolly;
  public spinner;
  public retrieveFrom;
  constructor() {
    this.hotels = [];
    this.notEmptyPost = true;
    this.notscrolly = true;
    this.spinner = false;
    this.retrieveFrom = null;
  }
}
