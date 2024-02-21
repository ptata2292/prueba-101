import { HotelData } from "./hotel-data";

export class HotelList {
  public hotels: HotelData[];
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